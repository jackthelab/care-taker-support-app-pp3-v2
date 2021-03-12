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
            addSupportGroup.id = "add-support-group-button"
            addSupportGroup.innerText = "Join New Group"
            addSupportGroup.addEventListener('click', () => {
                showJoinGroupForm()
            })
        
        document.getElementById('new-group-form').addEventListener('submit', (e) => {
            e.preventDefault()
            let groupId = e.target.group.value.split('--')[0]
<<<<<<< HEAD
        
=======
            
>>>>>>> jacob-extra-working
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
            newCheckInButton.id = "new-check-in-button"
            newCheckInButton.innerText = "Check-In Now!"
            newCheckInButton.addEventListener('click', () => {
                showCheckInForm()
            })
            
            document.getElementById('new-check-in-form').addEventListener('submit', (e) => {
                createCheckIn(e, member)
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

    const joinNewGroupBtn = document.getElementById("add-support-group-button")

    const newGroupForm = document.getElementById('new-group-form')
        if(showingJoinGF === false) {
            newGroupForm.classList.remove('hide')
            joinNewGroupBtn.innerText = "Done"
            showingJoinGF = !showingJoinGF
        } else {
            newGroupForm.classList.add('hide')
            joinNewGroupBtn.innerText = "Join New Group"
            showingJoinGF = !showingJoinGF
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
            renderNewGroup(resMS)
            showJoinGroupForm()
        })
}

function deleteMembership(ms) {
    fetch(MEMBERSHIPS_URL+`${ms.id}`, {method: "DELETE"})
        .then(res => res.json())
        .then(_ => {
            if(!document.getElementById('support-group-list').childNodes[0]) {
                document.getElementById('support-group-list').innerHTML = "<p>Get started by joining a group now!</p>"
            }
        })
}

function renderCheckIn(ci) {

    const checkInList = document.getElementById('check-ins-list')

    if(checkInList.innerHTML = "<p>Let's get started with your first check-in!") {
        checkInList.innerHTML = ''
    }

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
            ciComment.innerText = "NO COMMENT AVAILABLE. Consider adding one to help identify positive and negative triggers."
        }
    
    const ciEditCommentButton = document.createElement('button')
        ciEditCommentButton.classList.add('btn-sm', 'btn-outline-info', 'ci-button')
        ciEditCommentButton.innerText = "Edit Comment"
        ciEditCommentButton.addEventListener('click', () => {
        //    alert(`${ci.member.name} is trying to edit Check-In: ${ci.id}`) 
            if(document.getElementById("update-comment-form")) {
                document.getElementById("update-comment-form").remove()
            }
            editComment(newCI, ci)
        })

    const ciDeleteButton = document.createElement('button')
        ciDeleteButton.classList.add('btn-sm', 'btn-outline-danger', 'ci-button')
        ciDeleteButton.innerText = "Delete"
        ciDeleteButton.addEventListener('click', () => {
            // alert(`${ci.member.name} is trying to delete Check-In: ${ci.id}`)
            deleteCheckIn(ci, newCI)
        })
    
    newCI.append(ciRating, ciComment, ciEditCommentButton, ciDeleteButton)

    checkInList.insertBefore(newCI, checkInList.childNodes[0])

}

function showCheckInForm() {
    const newCheckInForm = document.getElementById('new-check-in-form')
    const checkInButton = document.getElementById('new-check-in-button')

    if(showingCIForm === false) {
        newCheckInForm.classList.remove('hide')
        checkInButton.innerText = "Done"
        showingCIForm = true
    } else {
        newCheckInForm.classList.add('hide')
        checkInButton.innerText = "Check-In Now!"
        showingCIForm = false
    }
}

function createCheckIn(e, member) {
    e.preventDefault()
    console.log(e.target.score.value)
    console.log(e.target.comment.value)

    let newScore = +e.target.score.value
    let newComment = e.target.comment.value

    const newCI = {
        score: newScore,
        comment: newComment,
        member_id: member.id
    }

    const reqObj = {
        headers: {"Content-Type": "application/json"},
        method: "POST",
        body: JSON.stringify(newCI)
    }

    fetch(CHECK_INS_URL, reqObj)
        .then(res => res.json())
        .then(ci => {
            renderCheckIn(ci)
            showCheckInForm()
            document.getElementById('new-check-in-form').reset()
        })

}

function deleteCheckIn(ci, ciBlock) {
    fetch(CHECK_INS_URL+`${ci.id}/`, {method: "DELETE"})
        .then(res => res.json())
        .then(res => {
            ciBlock.remove()
            if(!document.getElementById('check-ins-list').childNodes[0]) {
                document.getElementById('check-ins-list').innerHTML = "<p>Let's get started with you first check-in!</p>"
            }
        })
}

function editComment(ciBlock, ci) {

    let currentCommentArea = ciBlock.querySelector('p')

    const updateCIForm = document.createElement('form')
        updateCIForm.id = "update-comment-form"

        const newCommentInstruction = document.createElement('h4')
            newCommentInstruction.innerText = "Update Comment"

        const newCommentInput = document.createElement('input')
            newCommentInput.type = "text"
            newCommentInput.name = "comment"

            
        const newCommentSubmit = document.createElement('input')
            newCommentSubmit.type = "submit"
            newCommentSubmit.value = "Update Comment"
            newCommentSubmit.classList.add('btn', 'btn-success', 'new-ci-button')
        
        updateCIForm.append(newCommentInstruction, newCommentInput, newCommentSubmit)

        updateCIForm.addEventListener('submit', (e) => {

            e.preventDefault()

            const updateCI = {
                comment: e.target.comment.value
            }

            reqObj = {
                headers: {"Content-Type": "application/json"},
                method: "PATCH",
                body: JSON.stringify(updateCI)
            }

            fetch(CHECK_INS_URL+`${ci.id}`, reqObj)
                .then(res => res.json())
                .then(res => {
                    // alert(`${res["message"]}`)
                    currentCommentArea.innerText = `${res["comment"]}`
                    updateCIForm.remove()
                })
        })
    
    const checkInFormSection = document.getElementById('check-in-form-section')
    checkInFormSection.insertBefore(updateCIForm, checkInFormSection.childNodes[0])
}
