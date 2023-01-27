<template>
  <div>
    <b-breadcrumb>
      <b-breadcrumb-item to="/dashboard">Dashboard</b-breadcrumb-item>
      <b-breadcrumb-item to="/dashboard/languages">Languages</b-breadcrumb-item>
      <b-breadcrumb-item active>Update Language</b-breadcrumb-item>
    </b-breadcrumb>
    <b-row>
      <b-col>
        <b-row>
          <b-col>
            <h2 class="page-title">Languages</h2>
          </b-col>
        </b-row>
        <update-language/>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import UpdateLanguage from "./components/UpdateLanguage";

export default {
  name: "EditCategory",
  components: {UpdateLanguage},
}
</script>