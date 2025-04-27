import { getEmployees } from './modules/init.js'

// GET DOM ELEMENTS
let empTable = document.querySelector('#employees')
let empCount = document.querySelector('#empCount')

// FETCH AND BUILD GRID ON PAGE LOAD
buildGrid()

// DELETE EMPLOYEE (UI ONLY)
empTable.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete')) {
        if (confirm('Are you sure you want to delete this employee?')) {
            let rowIndex = e.target.parentNode.parentNode.rowIndex
            empTable.deleteRow(rowIndex)
            // Update employee count
            updateEmployeeCount()
        }
    }
})

// BUILD THE EMPLOYEES GRID
async function buildGrid() {
    // LOAD EMPLOYEE DATA
    const employees = await getEmployees()

    // REMOVE EXISTING ROWS
    empTable.lastElementChild.remove()

    // CREATE NEW TBODY
    let tbody = document.createElement('tbody')

    // LOOP THROUGH EMPLOYEES
    for (let employee of employees) {
        let row = document.createElement('tr')

        row.innerHTML = `
            <td>${employee.id}</td>
            <td>${employee.name}</td>
            <td>${employee.ext}</td>
            <td><a href="mailto:${employee.email}">${employee.email}</a></td>
            <td>${employee.department}</td>
            <td><button class="btn btn-sm btn-danger delete">X</button></td>
        `
        tbody.appendChild(row)
    }

    // APPEND TO TABLE
    empTable.appendChild(tbody)

    // UPDATE EMPLOYEE COUNT
    empCount.value = `(${employees.length})`
}

// UPDATE EMPLOYEE COUNT
function updateEmployeeCount() {
    const rowCount = empTable.rows.length - 1 // subtract header row
    empCount.value = `(${rowCount})`
}
