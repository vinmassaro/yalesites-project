<?php

namespace Drupal\ys_links\Form;

use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Displays the ys_links admin settings form.
 */
class YsLinksAdminSettingsForm extends ConfigFormBase {

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    return new static(
      $container->get('config.factory')
    );
  }

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'ys_links_admin_settings';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    $config = $this->config('ys_links.settings');

    $ys_links_excluded_classes = implode("\n", $config->get('ys_links_excluded_classes'));

    $form['ys_links_excluded_classes'] = [
      '#type' => 'textarea',
      '#title' => $this->t('Excluded classes'),
      '#default_value' => $ys_links_excluded_classes,
      '#description' => $this->t('Enter a list of classes to exclude from the link renderer. One class per line.'),
    ];

    $form['ys_links_starting_context'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Starting context selector (id/class)'),
      '#default_value' => $config->get('ys_links_starting_context'),
      '#description' => $this->t('Enter a selector to use as the starting context for the link renderer. This is used to limit the scope of the link renderer. For example, if you only want to render links within a specific div, you could enter "#my-div-id" here.'),
    ];

    $form['ys_links_debug'] = [
      '#type' => 'checkbox',
      '#title' => $this->t('Enable debugging'),
      '#default_value' => $config->get('ys_links_debug'),
      '#description' => $this->t('Enable debugging in the javascript'),
    ];

    return parent::buildForm($form, $form_state);
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    $ys_links_excluded_classes = array_filter(array_map('trim', explode("\n", $form_state->getValue('ys_links_excluded_classes'))));

    $this->config('ys_links.settings')
      ->set('ys_links_excluded_classes', $ys_links_excluded_classes)
      ->set('ys_links_starting_context', $form_state->getValue('ys_links_starting_context'))
      ->set('ys_links_debug', $form_state->getValue('ys_links_debug'))
      ->save();
    parent::submitForm($form, $form_state);
  }

  /**
   * {@inheritdoc}
   */
  public function getEditableConfigNames() {
    return ['ys_links.settings'];
  }

}
