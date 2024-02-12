userProfile ={
    points: 600,
    level: 0,
    activeHabits: [
        {
        id: 1,
        name: "Rutina de HIIT",
        icon: "bicycle",
        desc: "Realizar una rutina de entrenamiento de alta intensidad para fortalecer el cuerpo.",
        duration: 30,
        points: 20,
        color: "#d76fee",
        lastCompletedDate: "2024-02-09",
        subTasks: [
          { id: 1, name: "Calentamiento dinámico" },
          { id: 2, name: "Ejercicios de alta intensidad" },
        ]
        },
        {
          id: 2,
          name: "Planificación de objetivos a largo plazo",
          icon: "bookmark",
          desc: "Establecer y revisar objetivos a largo plazo para el desarrollo personal y profesional.",
          duration: 10,
          points: 10,
          color: "#f3735f",
          lastCompletedDate: "2024-02-08",
          subTasks: [
          { id: 1, name: "Definir objetivos SMART" },
          { id: 2, name: "Crear un plan de acción" },
          ]
        },
        {
          id: 3,
          name: "Desafío de habilidades nuevas",
          icon: "bulb",
          desc: "Adquirir y practicar una nueva habilidad o hobby que estimule el crecimiento personal o profesional.",
          duration: 60,
          points: 30,
          color: "#65cce8",
          lastCompletedDate: "2024-02-08",
          subTasks: [
            { id: 1, name: "Investigar y seleccionar una nueva habilidad para aprender" },
            { id: 2, name: "Dedicar tiempo semanalmente para practicar y mejorar" },
          ]
        }
    ],
    premium: false,
    activeChallenges:[]   ,
    milestones: {
        currentMilestone: 0,
        nextMilestone: 1
    }
}