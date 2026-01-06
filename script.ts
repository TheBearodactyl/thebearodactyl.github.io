const discord_link = document.getElementById("discord-link");

discord_link?.addEventListener("click", () => {
	navigator.clipboard.writeText("@thebearodactyl");
});
