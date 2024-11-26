<?php

namespace Drupal\ys_embed\Plugin\EmbedSource;

use Drupal\ys_embed\Plugin\EmbedSourceBase;
use Drupal\ys_embed\Plugin\EmbedSourceInterface;

/**
 * Microsoft PowerBI embed source.
 *
 * @EmbedSource(
 *   id = "powerbi",
 *   label = @Translation("Microsoft PowerBI"),
 *   description = @Translation("Microsoft PowerBI embed source."),
 *   thumbnail = "powerbi.png",
 *   active = TRUE,
 * )
 */
class PowerBI extends EmbedSourceBase implements EmbedSourceInterface {

  /**
   * {@inheritdoc}
   */
  protected static $pattern = '/^https:\/\/app.powerbi.com\/(?<type>view|reportEmbed)(?<query_params>\?.+)/';

  /**
   * {@inheritdoc}
   */
  protected static $template = '<iframe class="iframe" title="{{ title }}" src="https://app.powerbi.com/{{ type }}{{ query_params }}" height="100%" width="100%" loading="lazy"></iframe>';

  /**
   * {@inheritdoc}
   */
  protected static $instructions = 'Open a report in the Power BI service. On the File menu, select Embed report > Website or portal. In the Secure embed code dialog, select the value under "Here\'s a link you can use to embed this content."';

  /**
   * {@inheritdoc}
   */
  protected static $example = 'https://app.powerbi.com/reportEmbed?reportId=66e25bd6-5e0a-4db8-ad0c-28bb31b0fd5e&autoAuth=true&ctid=dd8cbebb-2139-4df8-b411-4e3e87abeb5c';

  /**
   * {@inheritdoc}
   */
  protected static $displayAttributes = [
    'width' => '100%',
    'height' => '100%',
    'scrolling' => 'yes',
    'frameborder' => 'no',
    'embedType' => 'form',
    'isIframe' => TRUE,
  ];

  /**
   * {@inheritdoc}
   */
  public function getUrl(array $params): string {
    $type = $params['type'];
    $query_params = $params['query_params'];
    return 'https://app.powerbi.com/' . $type . $query_params;
  }

}
