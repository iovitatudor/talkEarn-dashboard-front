<template>
  <div class="call-app-wrapper">
    <div class="call-app">
      <div class="call-container">
        <in-coming-call :myId='myId' :recipientId='recipientId'/>
        <video-call :myId='myId' :recipientId='recipientId'/>
      </div>
    </div>
  </div>
</template>

<script>

import {mapGetters} from "vuex";
import InComingCall from "./InComingCall";
import VideoCall from "./VideoCall";

export default {
  name: "AppCall",
  components: {
    InComingCall,
    VideoCall,
  },
  data() {
    return {
      callProcess: false,
      myId: null,
      recipientId: null,
    }
  },
  computed: {
    ...mapGetters({
      authExpert: 'auth/getAuthExpert',
    }),
  },
  created() {
    // this.myId = `2wZ*h5C5h$7i`;
    this.myId = `expert-${authExpert.id}`;

    this.sockets.subscribe(`inComingCall-${this.myId}`, (data) => {
      this.$el.querySelector('.call-app').classList.add('call-app-display');
      const dataObject = JSON.parse(data);
      this.recipientId = dataObject.senderId;
    });

    this.sockets.subscribe(`startCall-${this.myId}`, (data) => {
      this.startCall();
    });

    this.sockets.subscribe(`declineCall-${this.myId}`, (data) => {
      this.endCall();
    });
  },
  methods: {
    initCall() {
      const data = {
        senderId: this.myId,
        recipientId: this.recipientId,
      };
      if (!this.callProcess) {
        this.$el.querySelector('.call-app').classList.add('call-app-display');
        this.$socket.emit('initCall', JSON.stringify(data));
      }
    },
    startCall() {
      this.callProcess = true;
      setTimeout(() => {
        this.$el.querySelector('.call-container').classList.add('container-increased');
      }, 10);
    },
    endCall() {
      this.$el.querySelector('.call-container').classList.remove('container-increased');
      this.$el.querySelector('.call-app').classList.remove('call-app-display');
      this.callProcess = false;
    }
  }
}
</script>

<style src="./Call.scss" lang="scss"/>