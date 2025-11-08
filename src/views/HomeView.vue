<template>
  <div class="home pa-4" style="max-width: 600px; margin: 0 auto;">
    <!-- Campo de nueva tarea -->
    <v-text-field
      v-model="nuevoTituloTarea"
      @click:append="agregarTarea"
      @keyup.enter="agregarTarea"
      variant="outlined"
      hide-details
      clearable
      :label="editandoId ? 'Editando tarea' : 'Nueva tarea'"
      :append-icon="editandoId ? 'mdi-content-save' : 'mdi-plus'"
      class="mb-4"
    />

    <!-- Lista de tareas -->
    <v-list>
      <v-list-item
        v-for="tarea in tareas"
        :key="tarea._id"
        :class="['mb-2 rounded-lg', tarea.hecho ? 'bg-red-lighten-5' : '']"
        @click="toggleHecho(tarea)"
      >
        <v-row align="center" class="w-100">
          <v-col cols="auto">
            <v-checkbox
              v-model="tarea.hecho"
              color="primary"
              hide-details
              @click.stop
            />
          </v-col>

          <v-col>
            <span :class="{ 'text-decoration-line-through': tarea.hecho }">
              {{ tarea.titulo }}
            </span>
          </v-col>

          <v-col cols="auto" class="d-flex gap-2">
            <v-btn icon variant="text" color="blue" @click.stop="EditarTarea(tarea)">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn icon variant="text" color="red" @click.stop="BorrarTarea(tarea._id)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import api from "@/backend/services/api";
export default {
  name: "HomeViewPage",
  data() {
    return {
      tareas: [],
      nuevoTituloTarea: "",
      editandoId: null,
    };
  },
  async mounted() {
    await this.cargarTareas();
  },
  methods: {
    async cargarTareas() {
      try {
        const res = await api.get("/tareas");
        this.tareas = res.data;
      } catch (error) {
        console.error("❌ Error al cargar tareas:", error);
      }
    },

    async agregarTarea() {
      if (!this.nuevoTituloTarea.trim()) return;

      try {
        if (this.editandoId) {
          await api.put(`/tareas/${this.editandoId}`, {
            titulo: this.nuevoTituloTarea.trim(),
          });
          this.editandoId = null;
        } else {
          await api.post("/tareas", {
            titulo: this.nuevoTituloTarea.trim(),
          });
        }
        this.nuevoTituloTarea = "";
        await this.cargarTareas();
      } catch (error) {
        console.error("❌ Error al guardar tarea:", error);
      }
    },

    async toggleHecho(tarea) {
      try {
        await api.put(`/tareas/${tarea._id}`, {
          hecho: !tarea.hecho,
        });
        await this.cargarTareas();
      } catch (error) {
        console.error("❌ Error al actualizar estado:", error);
      }
    },

    EditarTarea(tarea) {
      this.nuevoTituloTarea = tarea.titulo;
      this.editandoId = tarea._id;
    },

    async BorrarTarea(id) {
      if (!confirm("¿Deseas eliminar la tarea?")) return;
      try {
        await api.delete(`/tareas/${id}`);
        await this.cargarTareas();
      } catch (error) {
        console.error("❌ Error al eliminar tarea:", error);
      }
    },
  },
};
</script>

<style scoped>
.text-decoration-line-through {
  text-decoration: line-through;
}
</style>
