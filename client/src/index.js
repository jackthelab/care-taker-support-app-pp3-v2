const BASE_URL = 'http://localhost:3000/'
const MEMBERS_URL = BASE_URL + 'members/'
const SUPPORT_GROUPS_URL = BASE_URL + 'support_groups/'
const CHECK_INS_URL = BASE_URL + 'check_ins/'
let showingJoinGF = false

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

    console.log(member)

    document.getElementById('welcome-page').style.display = "none"

    const profileGreeting = document.getElementById('profile-greeting')
        profileGreeting.innerHTML = ''
        // profileGreeting.innerHTML = `<h1>Welcome ${member.name}!</h1>`
        const profileHeading = document.createElement('h1')
        profileHeading.innerText = `Welcome, ${member.name}`
        profileGreeting.appendChild(profileHeading)
    
    const supportGroups = document.getElementById('support-groups')
        // supportGroups.innerHTML = `<p>You are in ${member.support_groups.length} Support Groups</p>`
        const supportGroupsList = document.getElementById('support-group-list')
        supportGroupsList.innerHTML = ''
        if(member.support_groups && member.support_groups.length > 0) {
            member.support_groups.forEach(sg => {
                const newSG = document.createElement('li')
                    newSG.innerText = `${sg.name} on ${sg.meeting_day}`
                    supportGroupsList.appendChild(newSG)
            })
        } else {
            supportGroupsList.innerHTML = "<p>Find a support group to join with the button below</p>"
        }
        const addSupportGroup = document.createElement('button')
            addSupportGroup.classList.add('btn', 'btn-success')
            addSupportGroup.innerText = "Join New Group"
            addSupportGroup.addEventListener('click', () => {
                // console.log(`${member.id} is trying to join a new support group`)
                showJoinGroupForm()
                showingJoinGF = !showingJoinGF
            })
        
        document.getElementById('new-group-form').addEventListener('submit', (e) => {
            e.preventDefault()
            let groupId = e.target.group.value.split('--')[0]
            let memberId = member.id

            // console.log(`Member: ${memberId}, Group: ${groupId}`)
            joinGroup(memberId, groupId)
        })

        supportGroups.append(supportGroupsList, addSupportGroup)

    const checkIns = document.getElementById('check-ins')
        if(member.check_ins && member.check_ins.length > 0){
            checkIns.innerHTML = `<p>You currently have ${member.check_ins.length} check-ins reported</p>`
        } else {
            checkIns.innerHTML = "<p>Check-ins are an important part of tracking your emotional well-being. Start with your first check-in today!</p>"
        }

    const greeting = document.createElement('h1')
        greeting.innerText = ''
        greeting.innerText = `Welcome ${member.name}`

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
                // console.log(sg)
                const sgOption = document.createElement('option')
                    sgOption.innerText = `${sg.id}--${sg.name}--${sg.meeting_day}`
                sgDropdown.appendChild(sgOption)
            })
        })
}

function joinGroup(memberId, groupId) {

    const newMembership = {
        member_id: memberId,
        support_group_id: groupId
    }

    const reqObj = {
        headers: {"Content-Type": "application/json"},
        method: "POST",
        body: JSON.stringify(newMembership)
    }

    console.log(reqObj)
}