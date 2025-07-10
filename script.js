let currentParticipants = [];                                                                                                articipants = [];
let currentTeams = [];


function getParticipants() {
    const textarea = document.getElementById('participants');
    const participants = textarea.value
        .split('\n')
        .map(name => name.trim());
    return participants;                                                                                                                                                                                                           
}

function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function createTeams(participants, teamSize) {
    const shuffled = shuffleArray(participants);
    const teams = [];
    for (let i = 0; i < shuffled.length; i += teamSize) {
        teams.push(shuffled.slice(i, i + teamSize));
    }

    // Rédistribuer les participants restants
    if (teams.length > 1) {
        const lastTeam = teams[teams.length - 1];
        if (lastTeam.length < teamSize / 2) {
            const membersToRedistribute = teams.pop();
            membersToRedistribute.forEach((member, index) => {
                teams[index % teams.length].push(member);
            });
        }
    }
    return teams;
}

function displayTeams(teams) {
    const container = document.getElementById('teamsContainer');
    const stats = document.getElementById('stats');

    if (teams.length === 0) {
        container.innerHTML = `<div class="empty-state">
                <h3>Prêt à créer des équipes !</h3>
                <p>Ajoutez des participants et cliquez sur "Générer les équipes"</p></div>`;
        stats.style.display = 'none';
        return;
    }

    // Afficher les statistiques
    const totalParticipants = teams.reduce((sum, team) => sum + team.length, 0);
    document.getElementById('participantCount').textContent = `${totalParticipants}participants`;
    document.getElementById('teamInfo').textContent = `Ŕépartis en ${teams.length} équipe$ {teams.length > 1 ? 's' :"}`;
    stats.style.display = 'block';

    container.innerHTML = "";

    teams.forEach((team, index) => {
        const teamDiv = document.createElement('div');
        teamDiv.className = 'team';
        teamDiv.style.animationDelay = `${index * 0.1}s`;

        const teamName = `Équipe ${index + 1}`;
        teamDiv.innerHTML = `<h3>${teamName}</h3>
            ${team.map((member, memberIndex) => `<div class="member" style="animation-delay: ${(index * 0.1) + (memberIndex * 0.1)}s">${member}</div>`).join("")}`;


        container.appendChild(teamDiv);

    });
}
function generateTeams() {
    const participants = getParticipants();
    const teamSize = parseInt(document.getElementById('teamSize').value);


    if (participants.length === 0) {
        alert('Veuillez ajouter au moins un participant !');
        return;
    }

    if (participants.length < teamSize) {
        alert(`Vous avez besoin d'au moins ${teamSize} participants pour créer une équipe de cette taille !`);
        return;
    }

    currentParticipants = participants;
    currentTeams = createTeams(participants, teamSize);
    displayTeams(currentTeams);
}

function shuffleTeams() {
    if (currentParticipants.length === 0) {
        alert('Génére d\'abord des équipes !');
        return;
    }

    const teamSize = parseInt(document.getElementById('teamSize').value);

    // Ajouter animation des mélanges
    const members = document.querySelectorAll('.member');
    members.forEach(member => {
        member.classList.add('shuffle-animation');
    });

    setTimeout(() => {
        currentTeams = createTeams(currentParticipants, teamSize);
        displayTeams(currentTeams);

        // Retirer l'animation apres un délai
        setTimeout(() => {
            const newMembers = document.querySelectorAll('.member');
            newMembers.forEach(member => {
                member.classList.remove('shuffle-animation');
            });
        }, 1000);
    }, 500);
}

function clearTeams() {
    currentParticipants = [];
    currentTeams = [];
    document.getElementById('participants').value = "";
    displayTeams([]);
}

// Exemple automatique au changement
window.addEventListener('load', () => {
    const exampleParticipants =[
        // 'Hawa Moha',
        // 'Rozy Hakim',
        // 'Khuzayfy Taha',
        // 'Suhayla Sanusi',
        // 'Khansa Ali',
        // 'Hadeel Ommar',
        // 'Khassem Rahem',
        // 'Rayhana Hassane',
        // 'Iyomy Weche',
        // 'Chaby Acyl'

    ];
    document.getElementById('participants').value = exampleParticipants.join('\n');
});
