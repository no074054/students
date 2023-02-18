import { createApp } from 'vue';
import axios from 'axios';

createApp({
     data() {
         return {
            students: [],
            search: '',
            student: {"_id": 0, "name": "", "isDonePr": false, "group": ""}
         }
     },	 
     mounted () {
         axios.get('http://34.82.81.113:3000/students').then((response) => {
             this.students = response.data;
         });
     },
     methods: {
        deleteStudent(studId) {
            this.students = this.students.filter(elem => {
                return elem._id != studId;
            });
        },
        addStudent() {
            this.student._id = this.students.length+1;
            this.students.push(this.student);
        }
     },
 }).mount('#app');