<template>
  <div>
    <b-breadcrumb>
      <b-breadcrumb-item to="/dashboard">Dashboard</b-breadcrumb-item>
      <b-breadcrumb-item to="/dashboard/parameters">Parameters</b-breadcrumb-item>
      <b-breadcrumb-item active>Update Parameter</b-breadcrumb-item>
    </b-breadcrumb>
    <b-row>
      <b-col>
        <b-row>
          <b-col>
            <h2 class="page-title">Parameters</h2>
          </b-col>
        </b-row>
        <update-parameter/>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import UpdateParameter from "./components/UpdateParameter";

export default {
  name: "EditParameter",
  components: {UpdateParameter},
}
</script>