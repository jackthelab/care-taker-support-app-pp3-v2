const BASE_URL = 'http://localhost:3000/'
const MEMBERS_URL = BASE_URL + 'members/'
const SUPPORT_GROUPS_URL = BASE_URL + 'support_groups/'
const CHECK_INS_URL = BASE_URL + 'check_ins/'
const MEMBERSHIPS_URL = BASE_URL + 'memberships/'
let showingJoinGF = false
let showingCIForm = false

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('login-form').addEventListener('submit', memberLogin)
    document.getElementById('signup-form').addEventListener('submit', memberSignup)
})

function memberLogin(e) {
    e.preventDefault()
    
    fetchMemberByEmail(e.target.email.value)  
}

function memberSignup(e) {
    e.preventDefault()

    const newMember = {
        name: e.target.name.value,
        email: e.target.email.value
    }

    const reqObj = {
        headers: {"Content-Type": "application/json"},
        method: "POST",
        body: JSON.stringify(newMember)
    }

    fetch(MEMBERS_URL, reqObj)
        .then(res => res.json())
        .then(memRes => {
            renderMemberPage(memRes)
        })

}

async function fetchMemberByEmail(email) {
    let response = await fetch(MEMBERS_URL)
    let membersData = await response.json()

    let currentMember = {}

    for(i = 0; i < membersData.length; i++){
        if(membersData[i].email === email){
            currentMember = membersData[i]
            return renderMemberPage(currentMember)
        }
    }

}

function renderMemberPage(member) {

    document.getElementById('welcome-page').style.display = "none"

    const profileGreeting = document.getElementById('profile-greeting')
        profileGreeting.innerHTML = ''
        const profileHeading = document.createElement('h1')
        profileHeading.innerText = `Welcome, ${member.name}`
        profileGreeting.appendChild(profileHeading)
    
    const supportGroups = document.getElementById('support-groups')
        supportGroups.classList.remove('hide')
        const supportGroupsList = document.getElementById('support-group-list')
        supportGroupsList.innerHTML = ''
        
        fetch(MEMBERS_URL+`${member.id}/memberships/`)
            .then(res => res.json())
            .then(msData => {
                if(msData["message"]){
                    supportGroupsList.innerHTML = "<p>Get started by joining a group now!</p>"
                } else {
                    msData.forEach(ms => {
                        renderNewGroup(ms)
                    })
                }
            })

        const addSupportGroup = document.createElement('button')
            addSupportGroup.classList.add('btn', 'btn-success', 'sg-button')
            addSupportGroup.innerText = "Join New Group"
            addSupportGroup.addEventListener('click', () => {
                // console.log(`${member.id} is trying to join a new support group`)
                showJoinGroupForm()
                showingJoinGF = !showingJoinGF
                if(addSupportGroup.innerText === "Join New Group"){
                    addSupportGroup.innerText = "Done."
                } else {
                    addSupportGroup.innerText = "Join New Group"
                }
            })
        
        document.getElementById('new-group-form').addEventListener('submit', (e) => {
            e.preventDefault()
            let groupId = e.target.group.value.split('--')[0]
        
            joinGroup(member, groupId)
        })

        supportGroups.append(addSupportGroup)

    const checkIns = document.getElementById('check-ins')
        checkIns.classList.remove('hide')
        const checkInsList = document.getElementById('check-ins-list')
        checkInsList.innerHTML = ''

        fetch(MEMBERS_URL+`${member.id}/check_ins`)
            .then(res => res.json())
            .then(ciData => {
                if(ciData["message"]) {
                    checkInsList.innerHTML = "<p>Let's get started with your first check-in!"
                } else {
                    ciData.forEach(ci => {
                        renderCheckIn(ci)
                    })
                }
            })

        const newCheckInButton = document.createElement('button')
            newCheckInButton.classList.add('btn', 'btn-success', 'new-ci-button')
            newCheckInButton.innerText = "Check-In Now!"
            newCheckInButton.addEventListener('click', () => {
                showCheckInForm()
                if(newCheckInButton.innerText === "Check-In Now!") {
                    newCheckInButton.innerText = "Done."
                } else {
                    newCheckInButton.innerText = "Check-In Now!"
                }
            })
        
        checkIns.appendChild(newCheckInButton)

    const greeting = document.createElement('h1')
        greeting.innerText = ''
        greeting.innerText = `Welcome ${member.name}`

}

function renderNewGroup(ms) {

    let sg = ms.support_group

    const sgList = document.getElementById('support-group-list')

    if(sgList.innerHTML === "<p>Get started by joining a group now!</p>") {
        sgList.innerHTML = ''
    }
    
    const newSG = document.createElement('li')
        newSG.innerText = `${sg.name} on ${sg.meeting_day}`
        newSG.classList.add('list-group-item')

    const deleteButton = document.createElement('button')
        deleteButton.classList.add('btn-sm', 'btn-danger', 'sg-button')
        deleteButton.innerText = "Leave"
        deleteButton.addEventListener('click', () => {
            newSG.remove()
            deleteMembership(ms)
        })
    
    newSG.appendChild(deleteButton)
    
    sgList.appendChild(newSG)
}

function showJoinGroupForm() {

    const newGroupForm = document.getElementById('new-group-form')
        if(showingJoinGF === false) {
            newGroupForm.classList.remove('hide')
        } else {
            newGroupForm.classList.add('hide')
        }

    const sgDropdown = document.getElementById('new-group-dropdown')
        sgDropdown.innerHTML = ''

    fetch(SUPPORT_GROUPS_URL)
        .then(res => res.json())
        .then(sgData => {
            sgData.forEach(sg => {
                const sgOption = document.createElement('option')
                    sgOption.innerText = `${sg.id}--${sg.name}--${sg.meeting_day}`
                sgDropdown.appendChild(sgOption)
            })
        })
}

function joinGroup(member, groupId) {

    let memberId = member.id

    const newMembership = {
        member_id: memberId,
        support_group_id: groupId
    }

    const reqObj = {
        headers: {"Content-Type": "application/json"},
        method: "POST",
        body: JSON.stringify(newMembership)
    }

    fetch(MEMBERSHIPS_URL, reqObj)
        .then(res => res.json())
        .then(resMS => {
            // debugger
            let sg = resMS.support_group
            renderNewGroup(resMS)
        })
}

function deleteMembership(ms) {
    // console.log(deleteMembership)
    fetch(MEMBERSHIPS_URL+`${ms.id}`, {method: "DELETE"})
        .then(res => res.json())
        .then(console.log)
}

function renderCheckIn(ci) {

    const checkInList = document.getElementById('check-ins-list')

    const newCI = document.createElement('li')
        newCI.classList.add('list-group-item')
    
    const ciRating = document.createElement('h4')
        ciRating.innerText = ci.score
        if(ci.score === 3) {
            ciRating.classList.add('neutral-score')
        }else if (ci.score > 3) {
            ciRating.classList.add('positive-score')
        }else {
            ciRating.classList.add('negative-score')
        }

    const ciComment = document.createElement('p')
        if(ci.comment !== ''){
            ciComment.innerText = ci.comment
        }else {
            ciComment.innerText = "No comment Available"
        }

    const ciEditButton = document.createElement('button')
        ciEditButton.classList.add('btn-sm', 'btn-outline-info', 'ci-button')
        ciEditButton.innerText = "Edit"
        ciEditButton.addEventListener('click', () => {
           alert(`${ci.member.name} is trying to edit Check-In: ${ci.id}`) 
        })

    const ciDeleteButton = document.createElement('button')
        ciDeleteButton.classList.add('btn-sm', 'btn-outline-danger', 'ci-button')
        ciDeleteButton.innerText = "Delete"
        ciDeleteButton.addEventListener('click', () => {
            alert(`${ci.member.name} is trying to delete Check-In: ${ci.id}`)
        })
    
    newCI.append(ciRating, ciComment, ciEditButton, ciDeleteButton)

    checkInList.appendChild(newCI)

}

function showCheckInForm() {
    const newCheckInForm = document.getElementById('new-check-in-form')

    if(showingCIForm === false) {
        newCheckInForm.classList.remove('hide')
        showingCIForm = true
    } else {
        newCheckInForm.classList.add('hide')
        showingCIForm = false
    }
}
