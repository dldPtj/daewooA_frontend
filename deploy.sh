# !/bin/bash

set -e

echo "🥕 최신화"
git pull | true

echo "🥕 기존 컨테이너 중지"
docker stop front_container | true

echo "🥕 기존 컨테이너 제거"
docker rm front_container | true

echo "🥕 기존 이미지 제거"
docker rmi front_image | true

echo "🥕 신규 이미지 생성"
docker build -t front_image .

echo "🥕 신규 컨테이너 생성"
docker run -d -p 80:80 --name front_container --net backend_mjc_network front_image