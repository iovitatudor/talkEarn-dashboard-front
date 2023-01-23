<template>
  <div class="video-container">
    <div class="call speaking flip-back">
      <div v-if="inCall">
        <div id="remote-video" class="remote-video">
          <div id="local-video" class="local-video"></div>
        </div>
        <spinner v-if="loading"/>
        <ul class="actions video-actions">
          <li class="action">
            <b-button @click="decline"
                      size="lg"
                      class="ml-2 mr-2"
                      variant="danger" pill>
              <i class="la la-close"/>
            </b-button>
          </li>
          <li class="info-action">
<!--            <info :room="room" :sender="'John Smith'" :recipient="'Alex Black'"/>-->
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>

import {mapGetters, mapActions} from "vuex";
import axios from 'axios';
import * as twilio from 'twilio-video';
import busySound from '../../assets/audio/busySound.mp3';
import Spinner from "./partials/Spinner";
import Info from './partials/Info';

export default {
  name: "VideoCall",
  props: ['myId', 'recipientId'],
  components: {Spinner, Info},
  data() {
    return {
      loading: true,
      inCall: false,
      busySound: {},
      room: null,
    };
  },
  computed: {
    ...mapGetters({
      token: 'calls/getToken',
    })
  },
  mounted() {
    this.busySound = new Audio(busySound);
  },
  created() {
    this.sockets.subscribe(`declineCall-${this.myId}`, (data) => {
      this.endCall();
      if (this.inCall) {
        this.inCall = false;
        setTimeout(() => {
          window.location.reload();
        }, 2000)
      }
    });
    this.sockets.subscribe(`startCall-${this.myId}`, (data) => {
      const dataObject = JSON.parse(data);
      this.room = dataObject.room;
      this.startCall();
    });
  },
  methods: {
    ...mapActions({
      getToken: 'calls/getToken',
    }),
    async startCall() {
      this.inCall = true;
      await this.getToken(this.myId+this.recipientId);
      this.$el.querySelector(".speaking").classList.remove('flip-back');
      this.$el.querySelector(".speaking").classList.remove('-drop');
      await this.connectToRoom();
    },
    endCall() {
      this.busySound.play();
      this.$el.querySelector(".speaking").classList.add('-drop');
    },
    decline() {
      this.$socket.emit('declineCall', JSON.stringify({senderId: this.myId, recipientId: this.recipientId}));
    },
    async connectToRoom() {
      let audioOutputDevice;
      await navigator.mediaDevices.enumerateDevices().then(devices => {
        audioOutputDevice = devices.find(device => device.kind === 'audiooutput');
      })
      await twilio.connect(this.token, {name: this.room, type: 'peer-to-peer'}).then(room => {
        const localVideo = this.$el.querySelector('#local-video');
        const remoteVideo = this.$el.querySelector('#remote-video');

        twilio.createLocalVideoTrack().then(track => {
          localVideo.appendChild(track.attach());
          setTimeout(() => localVideo.classList.add('animate'), 200);
        })

        room.on('trackAdded', track => {
          if (track.kind === 'audio') {
            const audioElement = track.attach();
            audioElement.setSinkId(audioOutputDevice.deviceId).then(() => {
              document.body.appendChild(audioElement);
            })
          }
        })

        room.participants.forEach(participant => {
          participant.on('trackSubscribed', track => {
            this.loading = false;
            remoteVideo.appendChild(track.attach())
            setTimeout(() => remoteVideo.classList.add('animate'), 200);
          })
        })

        room.on('participantConnected', participant => {
          participant.tracks.forEach(publication => {
            if (publication.isSubscribed) {
              const track = publication.track
              this.loading = false;
              remoteVideo.appendChild(track.attach())
              setTimeout(() => remoteVideo.classList.add('animate'), 200);
            }
          })
          participant.on('trackSubscribed', track => {
            this.loading = false;
            remoteVideo.appendChild(track.attach())
            setTimeout(() => remoteVideo.classList.add('animate'), 200);
          })
        })

        room.on('disconnected', room => {
          room.localParticipant.videoTracks.forEach(publication => {
            publication.track.disable()
            publication.track.stop()
            publication.unpublish()
          })
        })
      }, error => {
        console.error(`Unable to connect to Room: ${error.message}`)
      })
    },
  }
}
</script>

<style src="./Call.scss" lang="scss"/>