<template>
  <router-view></router-view>
  <audio style="display: none;" controls ref="audu">
    <source :src="Vide" type="audio/mpeg" />
  </audio>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import Vide from "./assets/a.mp3";
// import { login } from "./api/login";
import { useLoginStore } from "./store/login";
import { Client } from "@stomp/stompjs";
import { ElMessageBox, ElNotification } from "element-plus";
import { IconifyIconOffline } from "./components/ReIcon";
import { useSettingStoreHook } from "./store/modules/settings";
import AlarmIcon from "@iconify-icons/ri/alarm-warning-fill";
import { useRenderIcon } from "./components/ReIcon/src/hooks";
import { Icon } from "@iconify/vue";

const pureSetting = useSettingStoreHook();
// WebSocket客户端配置
const stompClient = new Client({
  brokerURL: "/ws-api/ws"
  // process.env.NODE_ENV === "development"
  //   ? "ws://home.icepie.net:9020/ws"
  //   : "/ws-api/ws"
});
const audu = ref();
const navbarRef = ref();
stompClient.onConnect = frame => {
  stompClient.subscribe("/topic/info", greeting => {
    console.log("greeting", JSON.parse(greeting.body));
    const data = JSON.parse(greeting.body);

    // 根据消息类型设置通知类型和颜色
    let iconColor = "";
    switch (data.content.type) {
      case "环境报警":
        // iconColor = "#FAAD14"; // 橙色
        iconColor = "#FF4D4F"; // 红色
        break;
      case "设备报警":
        iconColor = "#FF4D4F"; // 红色
        break;
      case "物料报警":
        iconColor = "#FADC19"; // 黄色
        break;
      case "工艺报警":
        iconColor = "#FAAD14"; // 橙色
        break;
      default:
        iconColor = "#1890FF"; // 蓝色
    }

    // 音频是否在播放

    if (audu.value.paused) {
      audu.value.play().catch(err => {
        console.log(err);
      });
    }

    console.log("iconColor");
    ElNotification({
      title: data.content.type,
      message: data.content.description,
      customClass: "custom-notification",
      position: "bottom-right",
      icon: h(Icon, {
        icon: "ri:alarm-warning-fill",
        style: {
          color: iconColor,
        }
      })
    });
    // navbarRef.value.getNotice();
  });
};

stompClient.onWebSocketError = error => {
  console.error("Broker reported error: " + error);
};

stompClient.onStompError = frame => {
  console.error("Broker reported error: " + frame.headers["message"]);
  console.error("Additional details: " + frame.body);
};

// const set = reactive({
//   sidebar: computed(() => {
//     return useAppStoreHook().sidebar;
//   }),

//   device: computed(() => {
//     return useAppStoreHook().device;
//   }),

//   fixedHeader: computed(() => {
//     return pureSetting.fixedHeader;
//   }),

//   classes: computed(() => {
//     return {
//       hideSidebar: !set.sidebar.opened,
//       openSidebar: set.sidebar.opened,
//       withoutAnimation: set.sidebar.withoutAnimation,
//       mobile: set.device === "mobile"
//     };
//   }),

//   hideTabs: computed(() => {
//     return $storage?.configure.hideTabs;
//   })
// });

// const layoutHeader = defineComponent({
//   render() {
//     return h(
//       "div",
//       {
//         class: { "fixed-header": set.fixedHeader },
//         style: [
//           set.hideTabs && layout.value.includes("horizontal")
//             ? isDark.value
//               ? "box-shadow: 0 1px 4px #0d0d0d"
//               : "box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08)"
//             : ""
//         ]
//       },
//       {
//         default: () => [
//           !pureSetting.hiddenSideBar &&
//           (layout.value.includes("vertical") || layout.value.includes("mix"))
//             ? h(navbar, {
//               ref: navbarRef,
//               ref_key: "navbarRef",
//             })
//             : null,
//           !pureSetting.hiddenSideBar && layout.value.includes("horizontal")
//             ? h(Horizontal)
//             : null,
//           h(tag)
//         ]
//       }
//     );
//   }
// });




onMounted(() => {
  stompClient.activate();
  // login().then((res) => {
  //   console.log(res);
  // });
});
useLoginStore();
</script>

<style scoped></style>
