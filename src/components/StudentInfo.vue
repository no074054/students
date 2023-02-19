<template>
    <div style="display: flex; align-items: center; max-width: 50%; margin: auto;">
        <img v-bind:src="student.photo">
            <div>
                <b>{{ student.name }}</b>
                <br>
                Група {{ student.group }}
                <br>
                Робота {{ isDonePrOfStudent }}
                <br>
                Кількість студентів: {{ studentsCount }}
            </div>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        props: {
            id: '',
        },
        data() {
            return {
                student: {},
            };
        },	 
        mounted () {
            axios.get('http://34.82.81.113:3000/students/' + this.id).then((response) => {
                this.student = response.data;
            });
        },
        computed: {
            isDonePrOfStudent: function() {
                return this.student.isDonePr ? 'здана' : 'не здана';
            },

            studentsCount() {
                return this.$store.getters.getCount;
            }
        }
    }
</script>