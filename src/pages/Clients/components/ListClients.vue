<template>
  <div class="table-responsive">
    <table class="table table-striped">
      <thead>
      <tr>
        <th>#</th>
        <th>Cookie</th>
        <th>Info</th>
<!--        <th>Path</th>-->
        <th>Last Entry</th>
        <th>Status</th>
        <th>Assign</th>
        <th>Delete</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(client, key) in clients" :key="key">
        <td>
          <b>{{ key + 1 }}</b>
        </td>
        <td>
          <router-link :to="`/dashboard/clients/edit/${client.id}`">
            {{ client.cookie.substring(0, 40) }}
          </router-link>
        </td>
        <td class="flex-section">
          <div class="mb-0 mt-0">
            <span class="mb-0 mt-0">
              <small>
                <span class="fw-semi-bold">Name:</span>
                <span class="text-muted">{{ client.name ? client.name : ' ---' }}</span>
              </small>
            </span> <br>
            <span class="mb-0">
              <small>
                <span class="fw-semi-bold">Email:</span>
                <span class="text-muted">
                  {{ client.email ? client.email : ' ---' }}
                </span>
              </small>
            </span>
          </div>
        </td>
<!--        <td>-->
<!--          <b>{{ client.path }}</b>-->
<!--        </td>-->
        <td>
          {{ client.lastEntry | moment("calendar") }}
        </td>
        <td>
          <b-badge variant="success" v-if="client.available">Online</b-badge>
          <b-badge variant="warning" v-else>{{ client.lastEntry | moment("from") }}</b-badge>
        </td>
        <td>
          <assign-client :client="client"/>
        </td>
        <td>
          <remove-client :id="client.id"/>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import RemoveClient from "./RemoveClient";
import AssignClient from "./AssignClient";

export default {
  name: "ListClients",
  components: {RemoveClient, AssignClient},
  props: {
    clients: {type: Object}
  },
}
</script>