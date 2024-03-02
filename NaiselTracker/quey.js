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
          { id: 1, name: "Calentamiento dinámico", lastCompletedDate: "2024-02-09", },
          { id: 2, name: "Ejercicios de alta intensidad", lastCompletedDate: "2024-02-09", },
        ]
        },
    ],
    premium: false,
    activeChallenges:[],
    currentStreak: {
      count: 0, // Número actual de días consecutivos completando hábitos
      startDate: null, // Fecha de inicio de la racha actual
    },
    productivity: {
      current: 59, // Porcentaje actual de productividad
      history: [ // Registro histórico para mostrar en gráfico
        { date: '2024-02-08', productivity: 50 },
        { date: '2024-02-09', productivity: 55 },
      ],
    },
    habitsCompletion: {
      '2024-02-08': ['completed', 'skipped', 'todo'],
      '2024-02-09': ['completed', 'completed', 'todo'],
    },
    achievements: [
      {
        name: 'Ideal Day',
        description: 'Complete all your habits in a day',
        streak: 1,
        icon: 'medal',
        color: '#FFD700',
      },
      {
        name: 'Tiptop Triple',
        description: 'Complete all your habits for three days in a row',
        streak: 3,
        icon: 'rocket',
        color: '#8A2BE2',
      },
    ],
    milestones: {
      currentMilestone: 0,
      nextMilestone: 1,
      history: [ // Historial de hitos alcanzados
        { milestone: 1, dateAchieved: '2024-02-09' },
      ],
    },
}