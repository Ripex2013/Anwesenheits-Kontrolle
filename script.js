let students = [];

function addStudent() {
  const input = document.getElementById("nameInput");
  const name = input.value.trim();

  if (!name) return;

  students.push({ name, status: "none" });
  input.value = "";
  render();
}

function render() {
  const list = document.getElementById("list");
  list.innerHTML = "";

  let present = 0;
  let absent = 0;

  students.forEach((s, index) => {
    const div = document.createElement("div");
    div.className = "student " + s.status;
    div.textContent = s.name;

    let startX = 0;

    div.addEventListener("touchstart", e => {
      startX = e.touches[0].clientX;
    });

    div.addEventListener("touchend", e => {
      let endX = e.changedTouches[0].clientX;
      let diff = endX - startX;

      if (diff > 50) {
        students[index].status = "present";
      } else if (diff < -50) {
        students[index].status = "absent";
      }

      render();
    });

    list.appendChild(div);

    if (s.status === "present") present++;
    if (s.status === "absent") absent++;
  });

  document.getElementById("presentCount").textContent = present;
  document.getElementById("absentCount").textContent = absent;
}

render();
