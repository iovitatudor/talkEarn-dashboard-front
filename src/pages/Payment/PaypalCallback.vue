<template>
  <div class="tables-basic">
    <b-breadcrumb>
      <b-breadcrumb-item to="/dashboard">Dashboard</b-breadcrumb-item>
      <b-breadcrumb-item to="/dashboard/payment">Payment</b-breadcrumb-item>
      <b-breadcrumb-item active>Paypal Callback</b-breadcrumb-item>
    </b-breadcrumb>
    <b-row>
      <b-col>
        <b-row>
          <b-col>
            <h2 class="page-title">Paypal Callback</h2>
          </b-col>
        </b-row>
        <Widget customHeader>
          <div class="text-center">
            <span class="loader-customize" v-if="!message"></span>
            <p v-else>
              {{ message }}
            </p>
          </div>
          <seller-info v-if="seller" :seller="seller"/>
        </Widget>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Widget from "../../components/Widget/Widget";
import {SellerApi} from "../../api/ContentApi/seller";
import {mapGetters} from "vuex";
import {SetApiError} from "../../api/errors";
import SellerInfo from "./Components/SellerInfo";

export default {
  name: "PaypalCallback",
  components: {Widget, SellerInfo},
  data() {
    return {
      message: null,
      seller: null,
      paymentInfo: {
        merchant_id: null,
        merchant_id_in_paypal: null,
        permissions_granted: null,
        consent_status: null,
        product_intent_id: null,
        is_email_confirmed: null,
        account_status: null,
      },
    }
  },
  computed: {
    ...mapGetters({
      authExpert: 'auth/getAuthExpert',
    }),
  },
  mounted() {
    this.paymentInfo.merchant_id = this.$route.query.merchantId;
    this.paymentInfo.merchant_id_in_paypal = this.$route.query.merchantIdInPayPal;
    this.paymentInfo.permissions_granted = this.$route.query.permissionsGranted;
    this.paymentInfo.consent_status = this.$route.query.consentStatus;
    this.paymentInfo.product_intent_id = this.$route.query.productIntentId;
    this.paymentInfo.is_email_confirmed = this.$route.query.isEmailConfirmed;
    this.paymentInfo.account_status = this.$route.query.accountStatus;

    this.checkSeller(this.authExpert.id);
  },
  methods: {
    async createSeller() {
      const data = {...this.paymentInfo, expert_id: this.authExpert.id};
      try {
        const result = await SellerApi.create(data);
        this.seller = result.data;
        this.message = 'Data saved successfully!';
      } catch (e) {
        SetApiError(e);
        this.seller = null;
      }
    },
    async checkSeller(id) {
      try {
        const result = await SellerApi.getById(id);
        this.seller = result.data;
        this.message = 'This expert is already a seller.';
      } catch (e) {
        this.seller = null;
        await this.createSeller();
      }
    },
  }
}
</script>

<style scoped>
.loader-customize {
  width: 48px;
  height: 48px;
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