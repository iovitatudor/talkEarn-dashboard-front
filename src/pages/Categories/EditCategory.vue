<template>
  <div>
    <b-breadcrumb>
      <b-breadcrumb-item to="/dashboard">Dashboard</b-breadcrumb-item>
      <b-breadcrumb-item to="/dashboard/categories">Categories</b-breadcrumb-item>
      <b-breadcrumb-item active>Update Category</b-breadcrumb-item>
    </b-breadcrumb>
    <b-row>
      <b-col>
        <b-row>
          <b-col>
            <h2 class="page-title">Categories</h2>
          </b-col>
        </b-row>
        <update-category/>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import UpdateCategory from "./components/UpdateCategory";

export default {
  name: "EditCategory",
  components: {UpdateCategory},
}
</script>