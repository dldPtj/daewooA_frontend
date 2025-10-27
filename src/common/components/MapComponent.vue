<script>
/* global google */
export default {
  name: 'MapComponent',
  props: {
    address: {
      type: String,
      required: true
    },
    hotelName: {
      type: String,
      default: 'Location'
    }
  },
  data() {
    return {
      map: null,
      geocoder: null,
      marker: null,
      infoWindow: null,
    };
  },
  mounted() {
    this.initMap();
  },
  watch: {
    address: {
      immediate: true,
      handler(newAddress) {
        if (this.map && newAddress) {
          this.codeAddress(newAddress);
        }
      }
    }
  },
  methods: {
    initMap() {
      if (typeof google === 'undefined' || typeof google.maps === 'undefined') {
        setTimeout(this.initMap, 500);
        return;
      }

      this.geocoder = new google.maps.Geocoder();

      const initialLatLng = { lat: 35.690921, lng: 139.700599 };

      this.map = new google.maps.Map(this.$refs.mapCanvas, {
        zoom: 15,
        center: initialLatLng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });

      if (this.address) {
        this.codeAddress(this.address);
      }
    },

    codeAddress(address) {
      if (!this.geocoder || !this.map) return;

      this.geocoder.geocode({ 'address': address }, (results, status) => {
        if (status === 'OK') {
          const location = results[0].geometry.location;

          this.map.setCenter(location);

          if (this.marker) {
            this.marker.setPosition(location);
          } else {
            this.marker = new google.maps.Marker({
              map: this.map,
              position: location,
              title: this.hotelName
            });
          }

          this.setInfoWindow(this.marker, address);

        } else {
          console.error(`주소 변환(Geocoding) 실패: ${address} (${status})`);
        }
      });
    },

    setInfoWindow(marker, contentText) {
      if (this.infoWindow) {
        this.infoWindow.close();
      }

      this.infoWindow = new google.maps.InfoWindow({
        content: `<strong>${this.hotelName}</strong><br>${contentText}`
      });

      marker.addListener('click', () => {
        this.infoWindow.open(this.map, marker);
      });
    }
  }
};
</script>

<template>
  <div ref="mapCanvas" class="map-canvas"></div>
</template>

<style>
.map-canvas {
  width: 1232px;
  height: 450px;
  background-color: #f0f0f0;
  margin: 0 auto;
}
</style>