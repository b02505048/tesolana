<template>
  <main class="w-screen h-screen">
    <v-map class="w-full h-full" :options="state.map" @loaded="onMapLoaded">
      <template v-if="loaded">
        <v-marker
          :coordinates="marker.coordinates"
          :options="marker.options"
          :popup-options="marker.popup"
        >
          <template>
            <div
              class="flex row justify-start items-center"
              style="width: 200px"
            >
              <q-avatar>
                <img src="https://cdn.quasar.dev/img/avatar.png" />
              </q-avatar>
              <p
                class="q-ml-sm q-mb-none"
                style="overflow-wrap: anywhere; max-width: 130px"
              >
                {{ target }}
              </p>
            </div>
          </template>
        </v-marker>
      </template>
    </v-map>
  </main>
</template>

<script>
import { VMap, VMarker } from "v-mapbox";
import { computed, defineComponent, reactive } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "MapPage",

  components: {
    VMap,
    VMarker,
  },

  setup() {
    const target = useRoute().query["t"];

    const state = reactive({
      ui: {
        loaded: false,
        styleChanged: true,
      },
      map: {
        accessToken: !!process.env.MAPBOX_TOKEN
          ? process.env.MAPBOX_TOKEN
          : "pk.eyJ1Ijoic29jaWFsZXhwbG9yZXIiLCJhIjoiREFQbXBISSJ9.dwFTwfSaWsHvktHrRtpydQ",
        // container: mapContainer,
        style: "mapbox://styles/ygoh/cla225bal005y14syj4zcfz0u",
        // style: "mapbox://styles/mapbox/streets-v11?optimize=true",
        // style: "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json",
        center: [139.7013586, 35.6875364],
        zoom: 15,
        minZoom: 12,
        maxZoom: 18,
        crossSourceCollisions: false,
        failIfMajorPerformanceCaveat: false,
        attributionControl: false,
        preserveDrawingBuffer: true,
        hash: false,
        minPitch: 0,
        maxPitch: 60,
      },
    });

    const loaded = computed(() => state.ui.loaded);

    const marker = reactive({
      options: { color: "#1cbbb3", draggable: false },
      coordinates: [139.7013586, 35.6875364],
      popup: {
        options: {
          closeButton: false,
          closeOnClick: false,
          closeOnMove: false,
        },
      },
    });

    const onMapLoaded = (map) => {
      [
        "idle",
        "moveend",
        "touchend",
        "style.load",
        "sourcedata",
        "sourcedataloading",
      ].forEach((event) => {
        map.on(event, () => {
          if (event === "style.load") {
            const waiting = () => {
              if (!map.isStyleLoaded()) {
                state.ui.styleChanged = false;
                setTimeout(waiting, 200);
              } else {
                state.ui.styleChanged = true;
              }
            };
            waiting();
          }
        });
      });
      state.ui.styleChanged = true;
      state.ui.loaded = true;
    };

    return {
      loaded,
      marker,
      state,
      target,
      // methods
      onMapLoaded,
      // send_txn() {
      //   console.log("Hello");
      // },
    };
  },
});
</script>

<style>
@import "~mapbox-gl/dist/mapbox-gl.css";
@import "~v-mapbox/dist/v-mapbox.css";
.w-screen {
  width: 100vw;
}
.h-screen {
  height: 100vh;
}
.h-full {
  height: 100%;
}
.w-full {
  width: 100%;
}
</style>
