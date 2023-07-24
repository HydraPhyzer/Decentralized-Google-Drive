async function Main() {
  let Drive=await ethers.getContractFactory("Drive");
  let Instance=await Drive.deploy();
  
  console.log("Contarct Uploaded At : ", Instance.address);
}
Main().then(() => process.exit(0)).catch(error => {
  console.error(error.message);
  process.exit(1);
})
