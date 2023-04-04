<template>
  <div class="tables-basic">
    <b-breadcrumb>
      <b-breadcrumb-item to="/dashboard">Dashboard</b-breadcrumb-item>
      <b-breadcrumb-item active>Payment</b-breadcrumb-item>
    </b-breadcrumb>
    <b-row>
      <b-col>
        <b-row>
          <b-col>
            <h2 class="page-title">Payment</h2>
          </b-col>
        </b-row>
        <Widget customHeader>
          <div class="table-responsive" v-if="!seller">
            <become-seller v-if="payPalToken" :token="payPalToken" :authExpert="authExpert"/>
          </div>
          <div class="table-responsive" v-else>
            <seller-info v-if="seller" :seller="seller"/>
          </div>
        </Widget>
      </b-col>
    </b-row>

  </div>
</template>

<script>

import {mapGetters, mapActions} from "vuex";
import {SellerApi} from "../../api/ContentApi/seller";
import BecomeSeller from "./Components/BecomeSeller";
import Widget from "../../components/Widget/Widget";
import SellerInfo from "./Components/SellerInfo";

export default {
  name: "Payment",
  components: {Widget, BecomeSeller, SellerInfo},
  data() {
    return {
      token: null,
      seller: null,
    }
  },
  computed: {
    ...mapGetters({
      authExpert: 'auth/getAuthExpert',
      payPalToken: 'payment/getPayPalToken',
    }),
  },
  async mounted() {
    await this.checkSeller(this.authExpert.id);
    await this.getPayPalToken();
  },
  methods: {
    ...mapActions({
      getPayPalToken: 'payment/getPayPalToken',
    }),
    async checkSeller(id) {
      try {
       const result = await SellerApi.getByExpertId(id);
       this.seller = result.data;
      } catch (e) {
        this.seller = null;
      }
    },
  }
}
</script>


