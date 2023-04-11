// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    srcDir: 'src/',
    modules: ['@element-plus/nuxt'],
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    // additionalData:'@use "@/assets/"'
                }
            },
        }
    },
})
