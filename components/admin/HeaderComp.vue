<template>
  <header class="h-20 shadow">
    <div
      class="flex justify-between bg-gradient-to-r from-slate-800 to-slate-950 items-center text-slate-50 md:px-10 px-5 size-full"
    >
      <div class="flex gap-10 items-center">
        <q-btn icon="fa fa-bars" class="" @click="() => emit('togleNav')"/>
        <h2 class="text-2xl font-bold bg-gradient-to-r from-slate-300 to-slate-700 bg-clip-text text-transparent">ADMIN</h2>
      </div>

      <q-btn round class="q-mx-lg">
          <q-avatar>
            <nuxt-img src="/img/admin-user.jpg" sizes="72px" format="webp" densities="x1" loading="lazy" alt="Profile placeholder image" />
          </q-avatar>
          <q-menu class="bg-accent text-white">
            <div class="row no-wrap q-pa-md">
              <div class="column items-center">
                <q-avatar size="72px">
                  <nuxt-img src="/img/admin-user.jpg" sizes="72px" format="webp" densities="x1" loading="lazy" alt="Profile placeholder image" />
                </q-avatar>

                <div class="text-subtitle1 q-mt-md q-mb-xs">okigwe ebeube ireneaus</div>

                <q-btn
                  color="primary"
                  label="Logout"
                  push
                  size="sm"
                  v-close-popup
                />
              </div>
            </div>
          </q-menu>
        </q-btn>
    </div>
  </header>
</template>

<script setup lang="ts">
const emit = defineEmits(['togleNav'])
const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "#about" },
  {
    name: "Service",
    href: "#service",
    sublinks: [
      { name: "Digital Currency", href: "/service/digital-currency" },
      { name: "forex", href: "/service/forex" },
      { name: "Commodities", href: "/service/commodities" },
      { name: "Real Estate", href: "/service/real-estate" },
      { name: "Stocks", href: "/service/stocks" },
    ],
  },
  { name: "Our Plan", href: "#plan" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "Contact", href: "#contact" },
];
</script>

<style scoped>
:deep(.q-btn.btn--no-hover .q-focus-helper) {
  display: none;
}

a {
  font-size: 0.9rem;
  font-weight: medium;
}
:deep(.q-btn .q-icon, .q-btn .q-spinner) {
  font-size: 0.9rem;
}
</style>
