const teams = [
  {
    teamName: 'Team Aduak',
    get points () {
      return this.W * 3 + this.D
    },
    W: 0,
    D: 1,
    L: 1,
    GP: 2,
    GF: 4,
    GA: 6,
    get goalDifference () {
      return this.GF - this.GA
    },
    jerseyColor: 'white'
  },
    {
    teamName: 'Team Apollos',
    get points () {
      return this.W * 3 + this.D
    },
    W: 1,
    D: 1,
    L: 0,
    GP: 2,
    GF: 2,
    GA: 0,
    get goalDifference () {
      return this.GF - this.GA
    },
    jerseyColor: 'red'
  },
    {
    teamName: 'Team Abubakar',
    get points () {
      return this.W * 3 + this.D
    },
    W: 0,
    D: 2,
    L: 0,
    GP: 2,
    GF: 2,
    GA: 2,
    get goalDifference () {
      return this.GF - this.GA
    },
    jerseyColor: 'blue'
  },
    {
    teamName: 'Team Ayuba',
    get points () {
      return this.W * 3 + this.D
    },
    W: 0,
    D: 2,
    L: 0,
    GP: 2,
    GF: 6,
    GA: 6,
    get goalDifference () {
      return this.GF - this.GA
    },
    jerseyColor: 'black'
  }
]

teams.sort((a, b) => {
  return b.points - a.points || b.goalDifference - a.goalDifference || b.GF - a.GF
})
const container = document.querySelector('.tableContainer')

teams.forEach((team, i) => {
  container.innerHTML += `<div class= "teamDiv">
      <div class = 'valuesDiv'">
        ${i + 1}
      </div>
      <div class = 'valuesDiv teamName'>
        <span class = 'jerseyColor' style="background-color: ${team.jerseyColor}; max-width: 80px;color: ${team.jerseyColor}">eIi</span>
        ${team.teamName}
      </div>
      <div class = 'valuesDiv'>
        ${team.GP}
      </div>
      <div class = 'valuesDiv'>
        ${team.points}
      </div>
      <div class = 'valuesDiv'>
        ${team.GF}
      </div>
      <div class = 'valuesDiv'>
        ${team.GA}
      </div>
      <div class = 'valuesDiv'>
        ${team.goalDifference}
      </div>
    </div>`
    document.querySelectorAll('.teamDiv').forEach(div => {
      div.style.display = 'flex'
      div.style.flexDirection = 'row'
      div.style.gap = '10px'
      div.style.textAlign = 'center'
      div.style.flex = '1'
    })
})