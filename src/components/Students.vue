<template>
    <div>
        <input type="text" name="search" value=""><br>

		<table class="table table-dark">
			<tr v-for="item in students" v-bind:id="item._id"> 
				<template v-if="item._id == editId">
                    <td><input v-model="item.name"></td>
                    <td><input type="checkbox" v-model="item.isDonePr"></td>
                    <td>
                        <select v-model="item.group">
                            <option value="RPZ 19 1/9">RPZ 19 1/9</option>
                            <option value="RPZ 19 2/9">RPZ 19 2/9</option>
                        </select>
                    </td>
                    <td>
                        <input type="button" v-on:click="update(editId)" value="Оновити">
                    </td>
                </template>
                <template v-else>
                    <td>
                        <router-link v-bind:to="'/student-info/'+item._id">
                            {{ item.name }}
                        </router-link>
                    </td>
                    <td><input type="checkbox" v-model="item.isDonePr"></td>
                    <td>{{ item.group }}</td>
                    <td>
                        <a href="#" @click="deleteStudent(item._id)" v-show="item.group === getCurrentUser.group">
                            Видалити
                        </a>
                    </td>
                    <td><a href="#" @click="rplForm(item._id)">Оновити</a></td>
                </template>
			</tr>
		</table>

		<input v-model="student.name">
		<input type="checkbox" v-model="student.isDonePr">
		<select v-model="student.group">
			<option value="RPZ 19 1/9">RPZ 19 1/9</option>
			<option value="RPZ 19 2/9">RPZ 19 2/9</option>
		</select>
		<button @click="addStudent()">Add student</button>

        <p>Кількість студентів: {{ studentsCount }}</p>
	</div>
</template>

<script>
    import axios from 'axios';

    export default {
        data() {
            return {
                students: [],
                search: '',
                editId: 0,
                student: {"name": "", "isDonePr": false, "group": ""}
            }
        },	 
        mounted () {
            axios.get('http://34.82.81.113:3000/students').then((response) => {
                this.students = response.data;
                this.$store.commit('setCount', this.students.length);
            });
        },
        computed: {
            studentsCount() {
                return this.$store.getters.getCount;
            },

            getCurrentUser() {
                return this.$store.getters.getUser;
            }
        },
        methods: {
            deleteStudent(studId) {
                axios.delete('http://34.82.81.113:3000/students/' + studId).then(data => {
                    // console.log(data);

                    this.students = this.students.filter(elem => {
                        return elem._id != studId;
                    });

                    this.$store.commit('setCount', this.students.length);
                });
            },

            addStudent() {
                axios.post('http://34.82.81.113:3000/students', this.student).then(data => {
                    this.student = data.data;

                    this.students.push({...this.student});

                    this.$store.commit('setCount', this.students.length);
                });
            },

            rplForm(id) {
                this.editId = id;
            },

            update(id) {
                let foundStudent = this.students.find((element) => {
                    return element._id == id;
                });

                axios.put("http://34.82.81.113:3000/students/" + id, {
                    name: foundStudent.name,
                    group: foundStudent.group,
                    isDonePr: foundStudent.isDonePr
                }).then((response) => {
                    // console.log(response.data);
                });

                this.editId = 0;
            }
        },
    }
</script>