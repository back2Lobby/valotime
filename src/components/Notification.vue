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
        margin: 2rem 1rem 0rem 1rem;
        gap: 0.3rem;
    }

    .notification {
        border: 1px solid var(--red);
        background-color: #333;
        color:white;
        padding: 1.2rem 1rem;
    }

    .notificaiton-title {
        color: var(--red);
        margin-bottom: 1rem;
    }

    .notification-body {
        font-size: 0.9rem;
    }

    @media (max-width:640px){
        .notification {
            padding: 0.5rem 0.3rem;
        }
    }
</style>