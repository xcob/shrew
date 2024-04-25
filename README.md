<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->


<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Shrew</h3>

  <p align="center">
    A web scraper with Wordpress 
  </p>
</div>



<!-- ABOUT THE PROJECT -->
## About The Project

Shrew is a web scraping project setup with MySQL database to create Wordpress sites from scraped page data.


<p align="right">(<a href="#readme-top">back to top</a>)</p>




<!-- GETTING STARTED -->
## Getting Started


### Prerequisites

You'll need the most recent stable version of NodeJS

[NodeJS](https://nodejs.org/en/download/current)

A package manager
* npm
  ```sh
  npm install npm@latest -g
  ```

You'll need the most recent stable version of Local WP (for your local Wordpress instance)

[Local WP](https://localwp.com/)


### Installation


1. Clone the repo
   ```sh
   git clone https://github.com/
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Install NPM packages
   ```sh
   npm run start
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

Shrew is used to extract HTML content from Site Sucker Zip files to inject into wrapped WPBakery code and inject it into a mysql DB

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

- [x] Pull in any used JS files the same as CSS files
- [ ] Figure out best way to update links
- [ ] Figure out best way to src images
- [ ] SFTP transfer for scraped CSS/JS
- [ ] Rewrite sql to write SQL file, doubt I have remote DB inject from this thing
- [ ] Refine extracted HTML content (Much later)
- [ ] Header/Footer buildout
- [ ] Rewrite sitemap CSV source from createReadStream to detect a csv file


<p align="right">(<a href="#readme-top">back to top</a>)</p>


