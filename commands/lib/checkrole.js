function check_role (member) {
	return !member.roles.cache.has('774574823363837993') &&  //Co-Owner
	!member.roles.cache.has('778505755576762418') && //Admin
	!member.roles.cache.has('778856916927250443') && //Verified Middleman
	!member.roles.cache.has('774894312789901312') && //Guild Master
	!member.roles.cache.has('774892652881117224') && //Verified Service Provider
	!member.roles.cache.has('774892007462010881') && //Verified Seller
	!member.roles.cache.has('778532539287207956') //Regular Member
}

module.exports = check_role