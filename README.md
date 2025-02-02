# Friends-wsb


web-site url - https://friendsrate.org

command for deploy 


BackEnd
docker build -t friendsback .
docker run -d --restart unless-stopped -p 7785:3000 --name myfriendsback friendsback

FrontEnd
docker build -t friendsfront .
docker run -d -p 5002:3000 --name myfriendsfront friendsfront



