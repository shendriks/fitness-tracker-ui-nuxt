<script setup lang="ts">
const { clear: clearSession } = useUserSession();

async function logout() {
    await clearSession();
    await navigateTo("/");
    push.info({ title: "Good Bye!", message: "Hope to see you soon.", duration: 5000 });
}

await logout();
</script>
