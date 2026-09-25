<?php
/** Private practitioner-owned Martial Profile V1. */
final class TJF_Practitioner_Profile {
    private const META_KEY = 'tjf_martial_profile_v1';

    public static function read( int $user_id ): array {
        if ( $user_id <= 0 || ! get_userdata( $user_id ) ) {
            throw new InvalidArgumentException( 'Invalid WordPress user.' );
        }
        $saved = get_user_meta( $user_id, self::META_KEY, true );
        $saved = is_array( $saved ) ? $saved : [];
        return array_replace_recursive( self::defaults( $user_id ), $saved );
    }

    public static function update( int $user_id, array $input ): array {
        if ( get_current_user_id() !== $user_id && ! current_user_can( 'edit_user', $user_id ) ) {
            throw new RuntimeException( 'Profile mutation is not authorized.' );
        }
        $profile = self::read( $user_id );
        if ( isset( $input['arts'] ) ) {
            $profile['arts'] = self::sanitize_list( $input['arts'] );
        }
        if ( isset( $input['dojos'] ) ) {
            $profile['dojos'] = self::sanitize_list( $input['dojos'] );
        }
        update_user_meta( $user_id, self::META_KEY, $profile );
        return self::read( $user_id );
    }

    private static function defaults( int $user_id ): array {
        return [
            'tuid' => TJF_TUID::for_user( $user_id ),
            'arts' => [], 'dojos' => [],
            'coach_onboarding_stage' => 'essential',
            'privacy' => [ 'profile' => 'private', 'coach' => 'private' ],
        ];
    }

    private static function sanitize_list( $values ): array {
        if ( ! is_array( $values ) ) { return []; }
        $values = array_map( static fn( $v ) => sanitize_text_field( (string) $v ), $values );
        return array_values( array_filter( array_unique( $values ), static fn( $v ) => '' !== $v ) );
    }
}
