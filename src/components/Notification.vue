<template>
    <div style="display:flex;justify-content:center;align-items:center;">
        <div id="notificationContainer">
            <div class="notification" v-for="notification in notifications" :key="notification.title">
                <h4 class="notificaiton-title">{{ notification.title }}</h4>
                <p class="notification-body">{{notification.body}}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Notification',
    props: ['notifications'],
}
</script>

<style scoped>
    #notificationContainer {
        display: flex;
        flex-direction: column;
        margin-top: 4rem;
        gap: 0.3rem;
    }

    .notification {
        border: 1px solid var(--red);
        background-color: #333;
        color:white;
        padding: 0.3rem;
    }

    .notificaiton-title {
        color: var(--red);
    }

    .notification-body {
        font-size: 0.9rem;
    }
</style>