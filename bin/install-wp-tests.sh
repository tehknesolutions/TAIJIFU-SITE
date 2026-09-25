#!/usr/bin/env bash
set -euo pipefail

DB_NAME=${1-wordpress_test}
DB_USER=${2-root}
DB_PASS=${3-root}
DB_HOST=${4-127.0.0.1}
WP_VERSION=${5-latest}
WP_TESTS_DIR=${WP_TESTS_DIR-/tmp/wordpress-tests-lib}
WP_CORE_DIR=${WP_CORE_DIR-/tmp/wordpress}

rm -rf "$WP_TESTS_DIR" "$WP_CORE_DIR"
mkdir -p "$WP_TESTS_DIR" "$WP_CORE_DIR"

if [ "$WP_VERSION" = "latest" ]; then
  WP_VERSION=$(curl -s https://api.wordpress.org/core/version-check/1.7/ | php -r '$j=json_decode(stream_get_contents(STDIN),true); echo $j["offers"][0]["version"];')
fi

curl -sL "https://wordpress.org/wordpress-${WP_VERSION}.tar.gz" | tar --strip-components=1 -xz -C "$WP_CORE_DIR"
curl -sL "https://develop.svn.wordpress.org/tags/${WP_VERSION}/tests/phpunit/includes/" -o /dev/null || true
svn export --quiet --force "https://develop.svn.wordpress.org/tags/${WP_VERSION}/tests/phpunit/includes" "$WP_TESTS_DIR/includes"
svn export --quiet --force "https://develop.svn.wordpress.org/tags/${WP_VERSION}/tests/phpunit/data" "$WP_TESTS_DIR/data"
curl -s "https://develop.svn.wordpress.org/tags/${WP_VERSION}/wp-tests-config-sample.php" > "$WP_TESTS_DIR/wp-tests-config.php"
sed -i "s/youremptytestdbnamehere/${DB_NAME}/; s/yourusernamehere/${DB_USER}/; s/yourpasswordhere/${DB_PASS}/; s|localhost|${DB_HOST}|; s|dirname( __FILE__ ) . '/src/'|'${WP_CORE_DIR}/'|" "$WP_TESTS_DIR/wp-tests-config.php"
mysqladmin ping -h "${DB_HOST%%:*}" -u"$DB_USER" -p"$DB_PASS" --wait=30 >/dev/null
