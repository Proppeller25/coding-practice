export const students = [{
        firstName: 'Emmanuel',
        lastName: 'Egbebo',
        matricNo: 'UG/18/1384',
        regNo: 'Yola/2025/082',
        hobbies: [
            'Gaming',
            'reading',
            'Art',
            'Music'
        ]
    },
    {
        firstName: 'Juliet',
        lastName: 'Ezekiel',
        matricNo: 'UG/18/1392',
        regNo: 'Yola/2025/083',
        hobbies: [
            'Writing',
            'Reading',
            'Dancing',
            'Music'
        ]
    },
    {
        firstName: 'Tarila',
        lastName: 'Ouserigha',
        matricNo: 'UG/18/1412',
        regNo: 'Yola/2025/352',
        hobbies: [
            'Singing',
            'Politics',
            'Football',
            'Music'
        ]
    },
    {
        firstName: 'Paul',
        lastName: 'Akpama',
        matricNo: 'UG/18/1369',
        regNo: 'Yola/2025/353',
        hobbies: [
            'Football Analyst',
            'Football',
            'Dancing',
            'Music (Bella Shmurda)'
        ]
    },
    {
        firstName: 'Anastasia',
        lastName: 'Obot',
        matricNo: 'UG/18/1400',
        regNo: 'Yola/2025/437',
        hobbies: [
            'Speaking',
            'Arguing',
            'Reading',
            'Music'
        ]
    }
]

export const users = getFromStorage('users') || [
    {
        firstName: 'Tamarauemomoemi',
        lastName: 'Egbebo',
        userName: 'Emmaxus',
        passWord: '09029020440e',
        email: 'emmanuelegbebo@gmail.com',
        phoneNo: '07010399628'
    }
]

export function saveToStorage (item) {
    localStorage.setItem('users', JSON.stringify(item))
}

export function getFromStorage(item) {
    return JSON.parse(localStorage.getItem(item))
}