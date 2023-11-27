<template>
  <header class="header">
    <div class="header__menu-container">
      <div class="header__logo-container">
        <img src="~/assets/img/merito-logo.png" alt="Merito logo" />
      </div>
      <h2 class="header__menu-title">
        {{ isMenuOpen ? "Menu" : currentRouteName }}
      </h2>

      <nav class="header__menu-desktop">
        <ul>
          <li v-for="item in menuConfig" :key="item.route">
            <nuxt-link :to="`/${item.route}`">{{ item.name }}</nuxt-link>
          </li>
        </ul>
      </nav>
      <div>
        <button
          class="hamburger"
          @click="toggleMenu"
          :class="{ 'is-active': isMenuOpen }"
        >
          <div class="bar"></div>
        </button>
      </div>
    </div>

    <nav
      v-if="isMenuOpen"
      class="header__menu-mobile"
      :class="{ 'is-active': isMenuOpen }"
    >
      <ul>
        <li v-for="item in menuConfig" :key="item.route">
          <nuxt-link :to="`/${item.route}`">{{ item.name }}</nuxt-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script lang="ts">
import { ref, computed } from "vue";

interface MenuItem {
  name: string;
  route: string;
}

export default {
  setup() {
    const menuConfig: MenuItem[] = [
      {
        name: "Wszyscy studenci",
        route: "",
      },
      {
        name: "Aktualni studenci",
        route: "currentStudents",
      },
      {
        name: "Absolwenci",
        route: "graduates",
      },
    ];

    const isMenuOpen = ref<boolean>(false);
    const toggleMenu = (): void => {
      document.body.style.overflowY = isMenuOpen.value ? "auto" : "hidden";
      isMenuOpen.value = !isMenuOpen.value;
    };

    const closeMenu = (): void => {
      isMenuOpen.value = false;
    };

    const currentRouteName = computed(() => {
      const route = useRoute();
      const currentRoute = route.name;

      const matchedItem = menuConfig.find(
        (item) => item.route === currentRoute
      );
      return matchedItem ? matchedItem.name : null;
    });

    const mdMediaQueryPx = 768;

    // Update body overflow based on window width
    const updateBodyOverflow = (): void => {
      if (window.innerWidth > mdMediaQueryPx) {
        document.body.style.overflowY = "auto";
      } else if (window.innerWidth <= mdMediaQueryPx && isMenuOpen.value) {
        document.body.style.overflowY = "hidden";
      }
    };

    onMounted(() => {
      window.addEventListener("resize", updateBodyOverflow);
    });

    onUnmounted(() => {
      window.removeEventListener("resize", updateBodyOverflow);
    });

    return {
      isMenuOpen,
      toggleMenu,
      closeMenu,
      menuConfig,
      currentRouteName,
    };
  },
};
</script>

<style lang="scss">
@import "@/assets/_variables.scss";

@mixin hamburgerBar($bar-width: 100%) {
  content: "";
  display: block;
  width: $bar-width;
  height: 5px;
  background-color: black;
  margin: 6px 0px;
  transition: 0.4s;
}

a.router-link-active {
  font-weight: bold;
}

.header {
  height: $header-height;
  background-color: white;
  padding: 1em;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 3px solid black;

  &__menu-container {
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;

    @media (min-width: $md) {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .header__menu-title {
      font-weight: bold;
      font-size: 1.5rem;
      display: block;
      order: 2;
      text-align: center;
      text-transform: uppercase;
      font-size: 1.25rem;

      @media (min-width: $md) {
        display: none;
      }
    }
    .header__menu-desktop {
      display: none;
      width: 100%;

      @media (min-width: $md) {
        display: block;
      }

      ul {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
        gap: 3em;
        order: 1;

        a {
          color: black;
          display: block;
          font-size: 16px;
          text-align: center;
          padding: 1em 0.5em;
          text-decoration: none;
          text-transform: uppercase;
        }
      }
    }
  }

  &__logo-container {
    @media (max-width: $md) {
      order: 3;
    }

    img {
      max-width: 40px;
    }
  }

  .hamburger {
    position: relative;
    display: block;
    width: 35px;
    cursor: pointer;

    appearance: none;
    background: none;
    outline: none;
    border: none;

    &.is-active:before {
      transform: rotate(-45deg) translate(-8px, 6px);
    }

    &.is-active:after {
      transform: rotate(45deg) translate(-9px, -8px);
      width: 100%;
    }

    &.is-active .bar {
      opacity: 0;
    }

    &:before,
    .bar {
      @include hamburgerBar;
    }

    &:after {
      @include hamburgerBar(60%);
    }

    @media (min-width: $md) {
      display: none;
    }
  }

  &__menu-mobile {
    position: fixed;
    top: 0;
    left: 100%;
    width: 100%;
    min-height: calc(100vh - $header-height);
    margin-top: $header-height;
    display: block;
    z-index: 98;
    background-color: $neuOrange;
    transition: 0.4s;

    &.is-active {
      left: 0;
    }

    a {
      color: black;
      display: block;
      font-size: 28px;
      width: 100%;
      text-align: center;
      padding: 1em 0.5em;
      border-bottom: 3px solid black;
      border-top: 0;
      text-decoration: none;
      text-transform: uppercase;
    }

    @media (min-width: $md) {
      display: none;
    }
  }
}
</style>
