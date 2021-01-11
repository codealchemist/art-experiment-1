const fs = require('fs')
const path = require('path')
const { promisify } = require('util')
const camelCase = require('camelcase')
const dir = promisify(fs.readdir)
const write = promisify(fs.writeFile)

async function run () {
  const experimentsDir = path.join(__dirname, './src/experiments')
  const files = (await dir(experimentsDir)).filter(file => file !== 'index.js')

  const fileImports = files.reduce((acc, file) => {
    const moduleName = camelCase(file.replace('.js', ''))
    acc += `import ${moduleName} from 'experiments/${file}'\n`
    return acc
  }, '')
  const defaultExport =
    'export default [\n' +
    files.reduce((acc, file) => {
      const moduleName = camelCase(file.replace('.js', ''))
      acc += `  ${moduleName},\n`
      return acc
    }, '') +
    ']\n'
  const output = `${fileImports}\n${defaultExport}`

  await write(`${experimentsDir}/index.js`, output)
  console.log(`UPDATED EXPERIMENTS INDEX: ${files.length}`)
}

run()
