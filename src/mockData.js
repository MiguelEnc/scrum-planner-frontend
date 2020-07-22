const mockData = {
  users: [
    {
      _id: "u1",
      name: "Miguel Encarnacion",
      email: "miguelencarnacion@gmail.com",
      projects: ["p1", "p2", "p2"],
    },
    {
      _id: "u2",
      name: "Eric Ramirez",
      email: "ericramirez@gmail.com",
      projects: ["p1", "p2"],
    },
    {
      _id: "u3",
      name: "Teodoro Alcántara",
      email: "teodoroalcantara@gmail.com",
      projects: ["p1", "p3"],
    },
    {
      _id: "u4",
      name: "Edwins Ventura",
      email: "edwinsventura@gmail.com",
      projects: ["p1"],
    },
  ],
  projects: [
    {
      _id: "p1",
      name: "Pac Corporativo",
      users: ["u1", "u2", "u3"],
      admins: ["u1"],
    },
    {
      _id: "p2",
      name: "XpertCode",
      users: ["u1", "u2"],
      admins: ["u2"],
    },
    {
      _id: "p3",
      name: "OrionTek",
      users: ["u1", "u3"],
      admins: ["u3"],
    },
  ],
  invitations: [
    {
      _id: "i1",
      sender: "u2",
      receiver: "edwinsventura@gmail.com",
      project: "p2",
      status: "Pending",
      sentDate: Date.now(),
    },
  ],
  retrospectives: [
    {
      _id: "r1",
      title: "2.7.4_Janos-Slynt",
      creationDate: Date.now(),
      project: "p1",
      active: true,
      columns: [
        {
          _id: "cl1",
          title: "Good",
          comments: [
            {
              _id: "cm1",
              text: "algo bueno",
              user: "u2",
            },
          ],
        },
        {
          _id: "cl2",
          title: "Bad",
          comments: [
            {
              _id: "cm2",
              text: "algo malo",
              user: "u3",
            },
          ],
        },
        {
          _id: "cl3",
          title: "Suggestions",
          comments: [
            {
              _id: "cm3",
              text: "una sugerencia",
              user: "u4",
            },
          ],
        },
      ],
    },
    {
      _id: "r2",
      title: "xpertcode-3.3.0",
      creationDate: Date.now(),
      project: "p2",
      active: true,
      columns: [
        {
          _id: "cl4",
          title: "Good",
          comments: [
            {
              _id: "cm4",
              text: "algo bueno",
              user: "u2",
            },
          ],
        },
        {
          _id: "cl5",
          title: "Bad",
          comments: [
            {
              _id: "cm5",
              text: "algo malo",
              user: "u2",
            },
          ],
        },
        {
          _id: "cl6",
          title: "Suggestions",
          comments: [
            {
              _id: "cm6",
              text: "una sugerencia",
              user: "u2",
            },
          ],
        },
      ],
    },
  ],
  tasks: [
    {
      _id: "t1",
      title: "ISFWEB-123 Implementar bla bla bla",
      score: 8,
      user: "u1",
      created: Date.now(),
      project: "p1",
    },
    {
      _id: "t2",
      title: "ISFWEB-123 Refactor bla bla bla",
      score: 5,
      user: "u2",
      created: Date.now(),
      project: "p1",
    },
    {
      _id: "t3",
      title: "ISFWEB-123 diseñar",
      score: 3,
      user: "u3",
      created: Date.now(),
      project: "p1",
    },
  ],
};

export const getProjectsByUserId = (id) => {
  return mockData.projects.filter((p) => p.users.includes(id));
};

export const getRetrospectivesByProjectId = (id) => {
  return mockData.retrospectives.filter((r) => r.project === id);
};

export const getTasksByProejctId = (id) => {
  return mockData.tasks.filter((t) => t.project === id);
};
