<template>
  <div>
    <b-breadcrumb>
      <b-breadcrumb-item to="/dashboard">Dashboard</b-breadcrumb-item>
      <b-breadcrumb-item to="/dashboard/categories">Collections</b-breadcrumb-item>
      <b-breadcrumb-item active>Update Collection</b-breadcrumb-item>
    </b-breadcrumb>
    <b-row>
      <b-col>
        <b-row>
          <b-col>
            <h2 class="page-title">Collections</h2>
          </b-col>
        </b-row>
        <update-collection/>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import UpdateCollection from "./components/UpdateCollection";

export default {
  name: "EditCollection",
  components: {UpdateCollection},
}
</script>