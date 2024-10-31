import { React, useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";

export default function App() {
  const [tarea, setTarea] = useState("");
  const [tareas, setTareas] = useState([]);
  const [numeroTareas, setNumeroTareas] = useState(0);

  const nuevaTarea = () => {
    if (tarea) {
      setTareas([
        ...tareas,
        { id: Date.now().toString(), nombre: tarea, completada: false },
      ]);
      setTarea("");
    }
  };

  const contarTareas = (lista) => {
    const cuenta = lista.filter((tarea) => tarea.completada).length;
    setNumeroTareas(cuenta);
  };

  const borrarTarea = (id) => {
    setTareas(tareas.filter((tarea) => tarea.id !== id));
    contarTareas(tareas);
  };

  const marcarTarea = (id) => {
    const tareasUpdate = tareas.map((tarea) => {
      if (tarea.id === id) {
        tarea.completada = !tarea.completada;
      }
      return tarea;
    });
    setTareas(tareasUpdate);
    contarTareas(tareasUpdate);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.campoTexto}
        placeholder="Ingrese aqui la nueva tarea"
        value={tarea}
        onChangeText={setTarea}
      />
      <Button title="Agregar" onPress={nuevaTarea} />
      <Text style={styles.contador}>Tareas completadas: {numeroTareas}</Text>
      <FlatList
        data={tareas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.contenedorTarea}>
            <Text
              style={[
                styles.textoTarea,
                item.completada && styles.tareaCompletada,
              ]}
            >
              {item.nombre}
            </Text>
            <TouchableOpacity onPress={() => marcarTarea(item.id)}>
              <Text style={styles.textoCompletar}>completar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => borrarTarea(item.id)}>
              <Text style={styles.textoBorrado}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  campoTexto: {
    borderWidth: 1,
    borderColor: "#bbb",
    padding: 10,
    marginBottom: 10,
  },
  contenedorTarea: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#bbb",
  },
  textoTarea: {
    fontSize: 18,
  },
  textoBorrado: {
    color: "red",
  },

  textoCompletar: {
    color: "green",
  },

  contador: {
    marginVertical: 10,
    fontSize: 16,
  },

  tareaCompletada: {
    textDecorationLine: "line-through",
    color: "gray",
  },
});
