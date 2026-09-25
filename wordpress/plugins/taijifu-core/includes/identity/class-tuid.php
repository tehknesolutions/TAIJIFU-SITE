<?php
/** Immutable TAIJIFU Universal IDs. */
final class TJF_TUID {
    private const PREFIXES = [
        'person' => 'PER', 'dojo' => 'DOJ', 'art' => 'ART',
        'technique' => 'TEC', 'credential' => 'CRD', 'course' => 'CRS',
        'training' => 'TRN', 'mission' => 'MSN', 'knowledge' => 'KNW',
        'transaction' => 'TXN',
    ];

    public static function mint( string $entity_type, string $uuid ): string {
        if ( ! isset( self::PREFIXES[ $entity_type ] ) ) {
            throw new InvalidArgumentException( 'Unknown TAIJIFU entity type.' );
        }
        $canonical = strtolower( trim( $uuid ) );
        if ( ! preg_match( '/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/', $canonical ) ) {
            throw new InvalidArgumentException( 'Invalid UUID.' );
        }
        $token = strtoupper( substr( hash( 'sha256', $entity_type . ':' . $canonical ), 0, 16 ) );
        return 'TJF-' . self::PREFIXES[ $entity_type ] . '-' . $token;
    }

    public static function for_user( int $user_id ): string {
        if ( $user_id <= 0 || ! get_userdata( $user_id ) ) {
            throw new InvalidArgumentException( 'Invalid WordPress user.' );
        }
        $stored = (string) get_user_meta( $user_id, 'tjf_tuid', true );
        if ( '' !== $stored ) {
            return $stored;
        }
        $uuid = (string) get_user_meta( $user_id, 'tjf_uuid', true );
        if ( '' === $uuid ) {
            $uuid = wp_generate_uuid4();
            add_user_meta( $user_id, 'tjf_uuid', $uuid, true );
            $uuid = (string) get_user_meta( $user_id, 'tjf_uuid', true );
        }
        $tuid = self::mint( 'person', $uuid );
        add_user_meta( $user_id, 'tjf_tuid', $tuid, true );
        return (string) get_user_meta( $user_id, 'tjf_tuid', true );
    }
}
