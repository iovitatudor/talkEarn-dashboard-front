<template>
  <div class="text-center">
    <p>
      To become a seller, you must connect to the instantexpert payment system.
    </p>
    <b-button variant="default" class="mr-3" size="md" @click="signUp" v-if="!loading">
      Become a seller
    </b-button>
    <b-button variant="default" class="mr-3" size="md" v-else>
      <span class="spinner-costume"></span>
    </b-button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "BecomeSeller",
  props: {
    token: {type: String},
    authExpert: {type: Object},
  },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    async signUp() {
      this.loading = true;

      const response = await axios.post(
        'https://api-m.sandbox.paypal.com/v2/customer/partner-referrals',
        {
          'tracking_id': `seller-${this.authExpert.id}-${this.authExpert.email}`,
          'operations': [
            {
              'operation': 'API_INTEGRATION',
              'api_integration_preference': {
                'rest_api_integration': {
                  'integration_method': 'PAYPAL',
                  'integration_type': 'THIRD_PARTY',
                  'third_party_details': {
                    'features': [
                      'PAYMENT',
                      'REFUND'
                    ]
                  }
                }
              }
            }
          ],
          'products': [
            'EXPRESS_CHECKOUT'
          ],
          'partner_config_override': {
            'return_url': 'https://core.instantexpert.online/dashboard/payment/paypal/callback',
          },
          'legal_consents': [
            {
              'type': 'SHARE_DATA_CONSENT',
              'granted': true
            }
          ]
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.token}`
          }
        }
      );

      window.location.href = response.data.links[1].href;
    },
  }
}
</script>

<style scoped>
.spinner-costume {
  width: 18px;
  height: 18px;
  border: 5px solid #FFF;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>