const BASE_URL = 'http://localhost:3000/'
const MEMBERS_URL = BASE_URL + 'members/'
const SUPPORT_GROUPS_URL = BASE_URL + 'support_groups/'
const CHECK_INS_URL = BASE_URL + 'check_ins/'

document.addEventListener("DOMContentLoaded", () => {
    console.log("connected")
    document.getElementById('login-form').addEventListener('submit', memberLogin)
    document.getElementById('signup-form').addEventListener('submit', memberSignup)
})

function memberLogin(e) {
    e.preventDefault()
    // console.log(e.target)
    console.log("Member is logging in")
    
    currentMember = fetchMemberByEmail(e.target.email.value)
    console.log(currentMember.id)  
}

function memberSignup(e) {
    e.preventDefault()
    // console.log(e.target)
    // console.log("Member is creating an account")

    const newMember = {
        name: e.target.name.value,
        email: e.target.email.value
    }

    // console.log(newMember)

    const reqObj = {
        headers: {"Content-Type": "application/json"},
        method: "POST",
        body: JSON.stringify(newMember)
    }

    // console.log(reqObj)

    fetch(MEMBERS_URL, reqObj)
        .then(res => res.json())
        .then(memRes => {
            renderMemberPage(memRes)
        })

    // currentMember = fetchMemberByEmail(e.target.email.value)
}

async function fetchMemberByEmail(email) {
    let response = await fetch(MEMBERS_URL)
    let membersData = await response.json()

    let currentMember = {}

    // membersData.forEach(member => {
    //     if(member.email === email){
    //         currentMember = member
    //         // console.log(currentMember)
    //         // return currentMember;
    //         return currentMember
    //     }
    // })

    for(i = 0; i < membersData.length; i++){
        if(membersData[i].email === email){
            currentMember = membersData[i]
            console.log(currentMember)
            return currentMember
        }
    }

}

function renderMemberPage(member) {

    document.getElementById('welcome-page').style.display = "none"

    const header = document.createElement('h1')
        header.innerText = `Welcome ${member.name}`
    
    document.body.append(header);

}
