import Task from "./Task";
import Student from "./Student";
import StudentCourse from "./StudentCourse";
import StudentExam from "./StudentExam";
import ExamSlots from "./ExamSlots";
import Session from "./Session";

const baseURL = "/api";

async function isAuthenticated() {
  let url = "/user";
  const response = await fetch(baseURL + url);
  const userJson = await response.json();
  if (response.ok) {
    return userJson;
  } else {
    let err = { status: response.status, errObj: userJson };
    throw err; // An object with the error coming from the server
  }
}

async function getTasks(filter) {
  let url = "/tasks";
  if (filter) {
    const queryParams = "?filter=" + filter;
    url += queryParams;
  }
  const response = await fetch(baseURL + url);
  const tasksJson = await response.json();
  if (response.ok) {
    //return tasksJson.map((t) => Task.from(t));
    return tasksJson.map(
      (t) =>
        new Task(
          t.id,
          t.description,
          t.important,
          t.privateTask,
          t.deadline,
          t.project,
          t.completed,
          t.user
        )
    );
  } else {
    let err = { status: response.status, errObj: tasksJson };
    throw err; // An object with the error coming from the server
  }
}

async function getPublicTasks() {
  let url = "/tasks/public";

  const response = await fetch(baseURL + url);
  const tasksJson = await response.json();
  if (response.ok) {
    //return tasksJson.map((t) => Task.from(t));
    return tasksJson.map(
      (t) =>
        new Task(
          t.id,
          t.description,
          t.important,
          t.privateTask,
          t.deadline,
          t.project,
          t.completed,
          t.user
        )
    );
  } else {
    let err = { status: response.status, errObj: tasksJson };
    throw err; // An object with the error coming from the server
  }
}

async function addTask(task) {
  return new Promise((resolve, reject) => {
    fetch(baseURL + "/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    })
      .then((response) => {
        if (response.ok) {
          resolve(null);
        } else {
          // analyze the cause of error
          response
            .json()
            .then((obj) => {
              reject(obj);
            }) // error msg in the response body
            .catch((err) => {
              reject({
                errors: [
                  { param: "Application", msg: "Cannot parse server response" },
                ],
              });
            }); // something else
        }
      })
      .catch((err) => {
        reject({ errors: [{ param: "Server", msg: "Cannot communicate" }] });
      }); // connection errors
  });
}

async function updateTask(task) {
  return new Promise((resolve, reject) => {
    fetch(baseURL + "/tasks/" + task.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    })
      .then((response) => {
        if (response.ok) {
        } else {
          // analyze the cause of error
          response
            .json()
            .then((obj) => {
              reject(obj);
            }) // error msg in the response body
            .catch((err) => {
              reject({
                errors: [
                  { param: "Application", msg: "Cannot parse server response" },
                ],
              });
            }); // something else
        }
      })
      .catch((err) => {
        reject({ errors: [{ param: "Server", msg: "Cannot communicate" }] });
      }); // connection errors
  });
}

async function deleteTask(taskId) {
  return new Promise((resolve, reject) => {
    fetch(baseURL + "/tasks/" + taskId, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          resolve(null);
        } else {
          // analyze the cause of error
          response
            .json()
            .then((obj) => {
              reject(obj);
            }) // error msg in the response body
            .catch((err) => {
              reject({
                errors: [
                  { param: "Application", msg: "Cannot parse server response" },
                ],
              });
            }); // something else
        }
      })
      .catch((err) => {
        reject({ errors: [{ param: "Server", msg: "Cannot communicate" }] });
      }); // connection errors
  });
}

async function userLogin(username, password) {
  return new Promise((resolve, reject) => {
    fetch(baseURL + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username, password: password }),
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((user) => {
            resolve(user);
          });
        } else {
          // analyze the cause of error
          response
            .json()
            .then((obj) => {
              reject(obj);
            }) // error msg in the response body
            .catch((err) => {
              reject({
                errors: [
                  { param: "Application", msg: "Cannot parse server response" },
                ],
              });
            }); // something else
        }
      })
      .catch((err) => {
        reject({ errors: [{ param: "Server", msg: "Cannot communicate" }] });
      }); // connection errors
  });
}

async function userLogout(username, password) {
  return new Promise((resolve, reject) => {
    fetch(baseURL + "/logout", {
      method: "POST",
    }).then((response) => {
      if (response.ok) {
        resolve(null);
      } else {
        // analyze the cause of error
        response
          .json()
          .then((obj) => {
            reject(obj);
          }) // error msg in the response body
          .catch((err) => {
            reject({
              errors: [
                { param: "Application", msg: "Cannot parse server response" },
              ],
            });
          }); // something else
      }
    });
  });
}

async function getStudentsOfCourse() {
  let url = "/studentsofcourse";
  const response = await fetch(baseURL + url);
  const studentsJson = await response.json();
  if (response.ok) {
    //return tasksJson.map((t) => Task.from(t));
    return studentsJson.map(
      (t) => new StudentCourse(t.cid, t.fullname, t.studentId)
    );
  } else {
    let err = { status: response.status, errObj: studentsJson };
    throw err; // An object with the error coming from the server
  }
}

async function isStudent() {
  let url = "/student";
  const response = await fetch(baseURL + url);
  const studentJson = await response.json();
  if (response.ok) {
    return studentJson;
  } else {
    let err = { status: response.status, errObj: studentJson };
    throw err; // An object with the error coming from the server
  }
}

async function studentLogin(sid) {
  return new Promise((resolve, reject) => {
    fetch(baseURL + "/studentLogin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sid: sid }),
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((student) => {
            resolve(student);
          });
        } else {
          // analyze the cause of error
          response
            .json()
            .then((obj) => {
              reject(obj);
            }) // error msg in the response body
            .catch((err) => {
              reject({
                errors: [
                  { param: "Application", msg: "Cannot parse server response" },
                ],
              });
            }); // something else
        }
      })
      .catch((err) => {
        reject({ errors: [{ param: "Server", msg: "Cannot communicate" }] });
      }); // connection errors
  });
}

async function studentLogout(sid) {
  return new Promise((resolve, reject) => {
    fetch(baseURL + "/studentlogout", {
      method: "POST",
    }).then((response) => {
      if (response.ok) {
        resolve(null);
      } else {
        // analyze the cause of error
        response
          .json()
          .then((obj) => {
            reject(obj);
          }) // error msg in the response body
          .catch((err) => {
            reject({
              errors: [
                { param: "Application", msg: "Cannot parse server response" },
              ],
            });
          }); // something else
      }
    });
  });
}

async function getStudentExams() {
  let url = "/studentexams";
  const response = await fetch(baseURL + url);
  const examsJson = await response.json();
  if (response.ok) {
    //return tasksJson.map((t) => Task.from(t));
    return examsJson.map((t) => new StudentExam(t.eid, t.name, t.sid));
  } else {
    let err = { status: response.status, errObj: examsJson };
    throw err; // An object with the error coming from the server
  }
}

async function getExamSlots(exam) {
  let url = "/exams/" + exam.id;
  const response = await fetch(baseURL + url);
  const examSlotJson = await response.json();
  if (response.ok) {
    //return tasksJson.map((t) => Task.from(t));
    return examSlotJson.map((t) => new ExamSlots(t.eid));
  } else {
    let err = { status: response.status, errObj: examSlotJson };
    throw err; // An object with the error coming from the server
  }
}

async function addSession(session) {
  return new Promise((resolve, reject) => {
    fetch(baseURL + "/addSession", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(session),
    })
      .then((response) => {
        if (response.ok) {
          resolve(null);
        } else {
          // analyze the cause of error
          response
            .json()
            .then((obj) => {
              reject(obj);
            }) // error msg in the response body
            .catch((err) => {
              reject({
                errors: [
                  { param: "Application", msg: "Cannot parse server response" },
                ],
              });
            }); // something else
        }
      })
      .catch((err) => {
        reject({ errors: [{ param: "Server", msg: "Cannot communicate" }] });
      }); // connection errors
  });
}

async function createExam(exam) {
  return new Promise((resolve, reject) => {
    fetch(baseURL + "/addExam", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(exam),
    })
      .then((response) => {
        if (response.ok) {
          resolve(null);
        } else {
          // analyze the cause of error
          response
            .json()
            .then((obj) => {
              reject(obj);
            }) // error msg in the response body
            .catch((err) => {
              reject({
                errors: [
                  { param: "Application", msg: "Cannot parse server response" },
                ],
              });
            }); // something else
        }
      })
      .catch((err) => {
        reject({ errors: [{ param: "Server", msg: "Cannot communicate" }] });
      }); // connection errors
  });
}

const API = {
  isAuthenticated,
  getTasks,
  getPublicTasks,
  addTask,
  updateTask,
  deleteTask,
  userLogin,
  userLogout,
  isStudent,
  studentLogin,
  studentLogout,
  getStudentsOfCourse,
  getStudentExams,
  getExamSlots,
  addSession,
  createExam,
};
export default API;
