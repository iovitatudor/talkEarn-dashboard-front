<template>
  <div class="text-center">
    <b-button variant="default" class="mr-3" size="md" @click="trackSeller">
      <b-icon icon="bootstrap-reboot"></b-icon>
      Track seller onboarding status
    </b-button>
    <table class="table table-striped">
      <thead>
      <tr>
        <th>Info</th>
        <th>Details</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>Merchant id</td>
        <td><b>{{ seller.merchantId }}</b></td>
      </tr>
      <tr>
        <td>Merchant id in PayPal</td>
        <td><b>{{ seller.merchantIdInPaypal }}</b></td>
      </tr>
      <tr>
        <td>Permissions granted</td>
        <td><b>{{ seller.permissionsGranted }}</b></td>
      </tr>
      <tr>
        <td>Consent status</td>
        <td><b>{{ seller.consentStatus }}</b></td>
      </tr>
      <tr>
        <td>Product intent id</td>
        <td><b>{{ seller.productIntentId }}</b></td>
      </tr>
      <tr>
        <td>Is email confirmed</td>
        <td><b>{{ seller.isEmailConfirmed }}</b></td>
      </tr>
      <tr>
        <td>Account status</td>
        <td><b>{{ seller.accountStatus }}</b></td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {mapGetters, mapActions} from "vuex";
import {SetApiError} from "../../../api/errors";
import axios from "axios";
import {SellerApi} from "../../../api/ContentApi/seller";

export default {
  name: "SellerInfo",
  props: {seller: {type: Object}, token: {type: String}},
  computed: {
    ...mapGetters({
      payPalToken: 'payment/getPayPalToken',
    }),
  },
  mounted() {
    this.getPayPalToken();
  },
  methods: {
    ...mapActions({
      getPayPalToken: 'payment/getPayPalToken',
      onSuccess: 'alert/onSuccess',
    }),
    async trackSeller() {
      try {
        const response = await axios.get(
          `https://api-m.sandbox.paypal.com/v1/customer/partners/3UJFNUNVNFUYC/merchant-integrations/${this.seller.merchantIdInPaypal}`
          , {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${this.payPalToken}`
            }
          });

        const data = {is_email_confirmed: response.data.primary_email_confirmed};
        await SellerApi.edit(this.seller.id, data);
        this.onSuccess('Seller was tracked successfully!');
      } catch (e) {
        SetApiError(e);
      }
    }
  },
}
</script>

<style scoped>

</style>