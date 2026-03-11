const footer = document.querySelector("footer");
footer.innerHTML = `
<div id="footer-intro-container">
	<span class="organisation-logo footer-heading">
		<span class="text-logo-first-letter">T</span><span class="text-logo-after-first-letter">iger Tank<span class="text-logo-malaysia"> Malaysia</span></span>
		<img src="../assets/image-logo.svg" class="image-logo">
	</span>
	<span class="footer-motto">Introducing entrepreneurship to Malaysian students.</span>
	<p><a href="/privacy-policy">Privacy policy</a></p>
</div>
<div>
	<address>
		<dl>
			<dt class="footer-heading">Contact us</dt>
			<dd>
				<ul>
					<li><a href="mailto:tigertankmalaysia@gmail.com">tigertankmalaysia@gmail.com</a></li>
					<li><a href="tel:+60166658769">+60 16-665 8769</a> (Marcus Ong, founder & managing director)</li>
				</ul>
			</dd>
		</dl>
	</address>
</div>
<div>
	<address>
		<dl>
			<dt class="footer-heading">Connect with us</dt>
			<dd>
				<ul id="social-media-list">
					<li><a href="https://instagram.com/tigertankmy" data-icon="instagram"></a></li>
					<li><a href="https://tiktok.com/@tigertankmy" data-icon="tiktok"></a></li>
					<li><a href="https://linkedin.com/company/tiger-tank-malaysia" data-icon="linkedin"></a></li>
				</ul>
			</dd>
		</dl>
	</address>
</div>
`;
