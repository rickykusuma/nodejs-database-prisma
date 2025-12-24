function tagFunction(array,...args){
  console.info(array)
  console.info(args)
}

test('tag function',()=>{
  const name = "Ricky"

  tagFunction`Hello ${name}!, How are you?`
  tagFunction`Bye ${name}!, see you later`
})

test('tag function',()=>{
  const name = "Ricky"
  const age = 30

  tagFunction`SELECT * FROM users WHERE name = ${name} AND age = ${age}`
})