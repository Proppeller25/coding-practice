export const teams = [
  {
    teamName: 'Team Aduak',
    get points () {
      return this.W * 3 + this.D
    },
    W: 0 + 1,
    D: 0 + 1,
    L: 1,
    get GP (){
      return this.W + this.D + this.L
    },
    GF: 4 + 3,
    GA: 6 + 1,
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
    D: 0 + 1,
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
    D: 1 + 1,
    L: 0 + 1,
    get GP (){
      return this.W + this.D + this.L
    },
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
    D: 1 + 1,
    L: 0,
    get GP (){
      return this.W + this.D + this.L
    },
    GF: 6,
    GA: 6,
    get goalDifference () {
      return this.GF - this.GA
    },
    jerseyColor: 'black'
  }
]

teams.sort((a, b) => {
  if (b.points !== a.points) {
    return b.points - a.points
  }
  if (b.goalDifference !== a.goalDifference) {
    return b.goalDifference - a.goalDifference
  }
  return b.GF - a.GF
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
      <div class = 'valuesDiv WLD'>
        ${team.W}-${team.L}-${team.D}
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