// init.js
export async function getEmployees() {
    try {
        const response = await fetch('../data/employees.json')
        if (!response.ok) {
            throw new Error('Failed to fetch employee data')
        }
        const employees = await response.json()
        return employees
    } catch (error) {
        console.error(error)
        return []
    }
}
