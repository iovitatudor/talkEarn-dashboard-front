<template>
  <div>
    <div class="call ringing" v-if="isCalling">
      <div class="head">
        <div class="call-animation">
          <img
            src="https://hope.be/wp-content/uploads/2015/05/no-user-image.gif"
            alt="">
        </div>
      </div>
      <div class="details">User is calling</div>
      <ul class="actions">
        <li class="cancel-calling-btn">
          <b-button @click="accept"
                    size="lg"
                    class="ml-2 mr-2"
                    variant="success" pill>
            <i class="la la-phone"/>
          </b-button>
          <b-button @click="refuse"
                    size="lg"
                    class="ml-2 mr-2"
                    variant="danger" pill>
            <i class="la la-close"/>
          </b-button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

import busySound from '../../assets/audio/busySound.mp3';
import callSound from '../../assets/audio/callSound.mp3';

export default {
  name: "InComingCall",
  props: ['myId', 'recipientId'],
  data() {
    return {
      isCalling: false,
      callSound: {},
      busySound: {},
      soundPlay: null,
      connectionTime: null,
    }
  },
  mounted() {
    this.callSound = new Audio(callSound);
    this.busySound = new Audio(busySound);
  },
  created() {
    this.sockets.subscribe(`inComingCall-${this.myId}`, () => {
      this.setInComingCall();
    });

    this.sockets.subscribe(`declineCall-${this.myId}`, () => {
      this.stopSound();
      this.endCall();
    });

    this.sockets.subscribe(`startCall-${this.myId}`, () => {
      this.stopSound();
      this.startCall();
    });
  },
  methods: {
    setInComingCall() {
      this.isCalling = true;
      this.playSound();
      setTimeout(() => {
        this.$el.querySelector('.ringing').classList.remove('-fadeout');
        this.$el.querySelector('.ringing').classList.add('-ringing');
      }, 600);
      this.connectionTime = setTimeout(() => {
        this.refuse();
        this.busySound.play()
      }, 20000)
    },
    playSound() {
      this.callSound.play()
      this.soundPlay = setInterval(() => {
        this.callSound.play()
      }, 2900);
    },
    stopSound() {
      clearInterval(this.soundPlay);
      this.callSound.pause();
      this.callSound.currentTime = 0;
    },
    accept() {
      this.$socket.emit('startCall', JSON.stringify({senderId: this.myId, recipientId: this.recipientId}));
    },
    refuse() {
      this.$socket.emit('declineCall', JSON.stringify({senderId: this.myId, recipientId: this.recipientId}));
    },
    startCall() {
      this.stopSound();
      clearTimeout(this.connectionTime);
      this.isCalling = false;
    },
    endCall() {
      this.isCalling = false;
      this.stopSound();
      clearTimeout(this.connectionTime);
    },
  }
}
</script>